import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator'

@InputType()
export class CreatePostInput {

  @IsString()
  @Field(() => String, { description: 'title of post (toto)' })
  title: string;

  @IsString()
  @Field(() => String, { description: 'post content' })
  content: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'post content' })
  thumbnail: string

  @IsString({each: true})
  @Field(() => [String])
  tags: string[]

  @IsBoolean()
  @Field(() => Boolean)
  published: boolean
}
