import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from '../prisma/prisma.service'
import { DEFAULT_PAGE_SIZE } from '../common/constants'
import { IFindAllOpt } from '../common/types/findall.types'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  create(createPostInput: CreatePostInput) {
    return 'This action adds a new post';
  }

  findAll(opt: IFindAllOpt = { skip: 0, take: DEFAULT_PAGE_SIZE}) {
    if (!opt) {
      opt = { skip: 0, take: DEFAULT_PAGE_SIZE}
    }
    return this.prisma.post.findMany(opt)
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({where: { id }, include: {
      author: true,
      tags: true
    }})
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
  count() {
    return this.prisma.post.count()
  }
}
