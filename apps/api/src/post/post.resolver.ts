import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { ExecutionContext, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard'

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postService.create(createPostInput);
  }

  // @UseGuards(JwtAuthGuard)
  @Query(() => [Post], { name: 'posts' })
  // findAll() {
  findAll(
    // @Context() context,
    @Args('skip', { nullable: true}) skip?: number,
    @Args('take', { nullable: true}) take?: number,
  ) {
    // console.log(context.req.user)
    return this.postService.findAll({ skip, take});
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    console.log('id', id)
    return this.postService.findOne(id);
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Post)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postService.remove(id);
  }

  @Query(() => Int, { name: 'post_count' })
  count() {
    return this.postService.count();
  }
}
