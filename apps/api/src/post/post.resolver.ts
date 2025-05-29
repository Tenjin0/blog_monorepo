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

  @Query(() => [Post], { name: 'posts' })
  findAll(
    @Args('skip', { nullable: true}) skip?: number,
    @Args('take', { nullable: true}) take?: number,
  ) {
    return this.postService.findAll(null, { skip, take});
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Post], { name: 'user_posts' })
  findAllByUser(
    @Context() context: any,
    @Args('skip', { nullable: true}) skip?: number,
    @Args('take', { nullable: true}) take?: number,
  ) {
    const userId = context.req.user.id
    return this.postService.findAll(userId, { skip, take});
  }


  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  updatePost(
    @Context() context: any,
    @Args('updatePostInput') updatePostInput: UpdatePostInput
  ) {
    const userId = context.req.user.id

    return this.postService.update(userId, updatePostInput);
  }

  @Query(() => Int, { name: 'post_count' })
  count() {
    return this.postService.count();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Int, { name: 'user_posts_count' })
  userCount( @Context() context: any,) {
    const userId = context.req.user.id
    return this.postService.count(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  createPost(@Context() context: any, @Args("createPostInput") createPostInput: CreatePostInput) {
    const userId = context.req.user.id
    return this.postService.create(createPostInput, userId)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  removePost(
    @Context() context: any,
    @Args('id', { type: () => Int }) id: number
  ) {
    const userId = context.req.user.id
    return this.postService.remove(id, userId);
  }
}
