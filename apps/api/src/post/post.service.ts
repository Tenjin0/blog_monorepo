import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { CreatePostInput } from './dto/create-post.input'
import { UpdatePostInput } from './dto/update-post.input'
import { PrismaService } from '../prisma/prisma.service'
import { DEFAULT_PAGE_SIZE } from '../common/constants'
import { IFindAllOpt } from '../common/types/findall.types'
import { generateSlug } from '../common/functions/generate_slug'
@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  create(createPostInput: CreatePostInput, authorId: number) {
      return this.prisma.post.create({
        data: {
          ...createPostInput,
          slug: generateSlug(createPostInput.title),
          author: {
            connect: {
              id: authorId
            }
          },

          tags: {
            connectOrCreate: createPostInput.tags.map(tag=>({
              where: {
                name: tag,
              },
              create: {name: tag}
            }))
          }
        }
      })
  }

  findAll(userId: number | null, opt: IFindAllOpt = { skip: 0, take: DEFAULT_PAGE_SIZE }) {
    if (!opt) {
      opt = { skip: 0, take: DEFAULT_PAGE_SIZE }
    }
    const findAllOpt: Prisma.PostFindManyArgs = { ...opt }

    findAllOpt.select = {
      id: true,
      content: true,
      createdAt: true,
      published: true,
      slug: true,
      title: true,
      thumbnail: true,
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    }
    findAllOpt.orderBy = {
      updatedAt: "desc"
    }

    if (userId) {
      findAllOpt.where = {
        authorId: userId
      }
    }
    return this.prisma.post.findMany(findAllOpt)
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { id }, include: {
        author: true,
        tags: true
      }
    })
  }

  async update(authorId: number, updatePostInput: UpdatePostInput) {
    const post = await this.prisma.post.findUnique({
      select: {
        id: true,
        authorId: true
      },
      where: {
        id: updatePostInput.id
      }
    })
    if (post?.authorId !== authorId) {
      throw new UnauthorizedException()
    }

    return this.prisma.post.update({
      where: {
        id: updatePostInput.id
      },
      data: {
        ...updatePostInput,
        slug: (updatePostInput.title ? generateSlug(updatePostInput.title) : undefined),
        tags: {
          set: [],
          connectOrCreate: updatePostInput.tags?.map((tag) => ({
            where : { name: tag },
            create: { name: tag }
          }))
        }
      }
    })
  }

  async remove(id: number, userId: number) {

    const post = await this.prisma.post.findUnique({
      select: {
        id: true,
        authorId: true
      },
      where: {
        id: id
      }
    })
    if (post?.authorId !== userId) {
      throw new UnauthorizedException()
    }

    const result = await this.prisma.post.delete({
      where: {
        id: id
      }
    })
    return !!result
  }

  count(userId?: number) {
    const opt: any = {}
    if (userId) {
      opt.where = {
        authorId: userId
      }
    }
    return this.prisma.post.count(opt)
  }
}
