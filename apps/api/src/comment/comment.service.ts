import { Injectable } from '@nestjs/common'
import { CreateCommentInput } from './dto/create-comment.input'
import { UpdateCommentInput } from './dto/update-comment.input'
import { IFindAllOpt } from '../common/types/findall.types'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { DEFAULT_PAGE_SIZE } from '../common/constants'

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) { }

  create(createCommentInput: CreateCommentInput) {
    return 'This action adds a new comment'
  }

  findAll(postId?: number, opt: IFindAllOpt = { take: DEFAULT_PAGE_SIZE, skip: 0 }) {
    const findManyOpt: Prisma.CommentFindManyArgs = {
      take: opt.take, skip: opt.skip,
      include: {
        author: true
      }
    }
    if (postId) {
      findManyOpt.where = { post: { id: postId } }
    }
    console.log(findManyOpt)
    return this.prisma.comment.findMany(findManyOpt)
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`
  }

  update(id: number, updateCommentInput: UpdateCommentInput) {
    return `This action updates a #${id} comment`
  }

  remove(id: number) {
    return `This action removes a #${id} comment`
  }

  count(postId?: number) {

    const countOpt: Prisma.CommentCountArgs = postId ? {
      where: {
        post: {
          id: postId
        }
      }
    } : {}
    return this.prisma.comment.count(countOpt)
  }
}
