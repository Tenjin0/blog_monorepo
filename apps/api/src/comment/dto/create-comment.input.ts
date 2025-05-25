import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsPositive, IsString } from 'class-validator'

@InputType()
export class CreateCommentInput {
  @IsPositive()
  @IsNumber()
  @Field(() => Int, { description: 'post id' })
  postId: number

  @IsString()
  @Field()
  content: string
}
