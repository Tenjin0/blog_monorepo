import { Resolver, Query, Mutation, Args, Int, Info, Context } from '@nestjs/graphql'
import { CommentService } from './comment.service'
import { Comment } from './entities/comment.entity'
import { CreateCommentInput } from './dto/create-comment.input'
import { UpdateCommentInput } from './dto/update-comment.input'
import { DEFAULT_PAGE_SIZE } from '../common/constants'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard'

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Comment)
  createComment(
    @Context() context: any,
    @Args('createCommentInput') createCommentInput: CreateCommentInput
  ) {
    const authorId = context.req.user.id
    return this.commentService.create(createCommentInput, authorId)
  }


  @Query(() => [Comment], { name: 'comments' })
  findAll(
    @Args("postId", { type: () => Int, nullable: true }) postId: number,
    @Args("take", { type: () => Int, nullable: true, defaultValue: DEFAULT_PAGE_SIZE }) take: number,
    @Args("skip", { type: () => Int, nullable: true, defaultValue: 0 }) skip: number,
  ) {
    return this.commentService.findAll(postId, { take, skip })
  }

  @Query(() => Comment, { name: 'comment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.findOne(id)
  }

  @Mutation(() => Comment)
  updateComment(@Args('updateCommentInput') updateCommentInput: UpdateCommentInput) {
    return this.commentService.update(updateCommentInput.id, updateCommentInput)
  }

  @Mutation(() => Comment)
  removeComment(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.remove(id)
  }

  @Query(() => Int, { name: 'comments_count' })
  count(@Args("postId", { type: () => Int, nullable: true }) postId?: number,
  ) {
    return this.commentService.count(postId)
  }
}
