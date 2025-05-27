import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateLikeInput } from './dto/create-like.input'
import { UpdateLikeInput } from './dto/update-like.input'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class LikeService {

  constructor(private prismaService: PrismaService) { }
  async create(createLikeInput: CreateLikeInput) {
    const data = await this.prismaService.$queryRaw`
    INSERT INTO "likes" ("userId", "postId") VALUES(${createLikeInput.userId}, ${createLikeInput.postId}) ON CONFLICT DO NOTHING
    RETURNING "id"` as unknown as Array<{id: number}>
    console.log(data)
    if (data && data.length === 0) {
        throw new BadRequestException("You have already liked this post")
    }
    return true

  }

  findAll() {
    return `This action returns all like`
  }

  findOne(id: number) {
    return `This action returns a #${id} like`
  }

  update(id: number, updateLikeInput: UpdateLikeInput) {
    return `This action updates a #${id} like`
  }

  async remove(createLikeInput: CreateLikeInput) {
    try {
      await this.prismaService.like.delete({
        where: {
          userId_postId : {
            postId: createLikeInput.postId,
            userId: createLikeInput.userId,
          }
        }
      })
      return true
    } catch(err) {
      console.log(err)
      throw new BadRequestException("like not found")
    }
  }

  getPostLikesCount(postId: number) {
    return this.prismaService.like.count({
      where: {
        postId: postId
      }
    })
  }

  async userLikedPost(arg0: { postId: number; userId: number }) {
    const data = await this.prismaService.like.findFirst({
      where: {
        postId: arg0.postId,
        userId: arg0.userId
      }
    })

    return !!data
  }

}
