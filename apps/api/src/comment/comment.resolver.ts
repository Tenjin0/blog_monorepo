import { Resolver, Query, Mutation, Args, Int, Info } from '@nestjs/graphql'
import { CommentService } from './comment.service'
import { Comment } from './entities/comment.entity'
import { CreateCommentInput } from './dto/create-comment.input'
import { UpdateCommentInput } from './dto/update-comment.input'
import { DEFAULT_PAGE_SIZE } from '../common/constants'

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) { }

  @Mutation(() => Comment)
  createComment(@Args('createCommentInput') createCommentInput: CreateCommentInput) {
    return this.commentService.create(createCommentInput)
  }


  @Query(() => [Comment], { name: 'comments' })
  findAll(
    @Args("postId", { type: () => Int, nullable: true }) postId: number,
    @Args("take", { type: () => Int, nullable: true, defaultValue: DEFAULT_PAGE_SIZE }) take: number,
    @Args("skip", { type: () => Int, nullable: true, defaultValue: 0 }) skip: number,
    @Info() info: any,
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
