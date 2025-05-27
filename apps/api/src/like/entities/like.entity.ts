import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity'
import { Post } from '../../post/entities/post.entity'


@ObjectType()
export class LikeMin {
  @Field(() => Int)
  id: number;
}
@ObjectType()
export class Like extends LikeMin {
  @Field(() => User)
  user: User
  @Field(() => Post)
  post: Post
}
