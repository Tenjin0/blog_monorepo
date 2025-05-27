import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLikeInput {
  @Field(() => Int, { description: 'post id' })
  postId: number;
  @Field(() => Int, { description: 'user id' })
  userId: number;
}
