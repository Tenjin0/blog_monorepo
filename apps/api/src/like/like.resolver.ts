import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { Like, LikeMin } from './entities/like.entity';
import { UpdateLikeInput } from './dto/update-like.input';
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard'
import { User } from '../user/entities/user.entity'

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async createLike(
    @Context() context: any,
    @Args('postId', { type: () => Int! }) postId: number
  ) {
    const user: User = context.req.user

    return this.likeService.create({ postId: postId, userId: user.id});

  }

  // @Query(() => [Like], { name: 'like' })
  // findAll() {
  //   return this.likeService.findAll();
  // }

  // @Query(() => Like, { name: 'like' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.likeService.findOne(id);
  // }

  // @Mutation(() => Like)
  // updateLike(@Args('updateLikeInput') updateLikeInput: UpdateLikeInput) {
  //   return this.likeService.update(updateLikeInput.id, updateLikeInput);
  // }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  removeLike(
    @Context() context: any,
    @Args('postId', { type: () => Int! }) postId: number
  ) {
    const user: User = context.req.user
    return this.likeService.remove({ postId: postId, userId: user.id});
  }

  @Query(() => Int)
  postLikeCount(@Args('postId', { type: () => Int!}) postId: number) {
    return this.likeService.getPostLikesCount(postId)
  }


  @UseGuards(JwtAuthGuard)
  @Query(() => Boolean)
    async userLikedPost(
    @Context() context: any,
    @Args('postId', { type: () => Int! }) postId: number
  ) {
    const user: User = context.req.user

    return this.likeService.userLikedPost({ postId: postId, userId: user.id});

  }
}
