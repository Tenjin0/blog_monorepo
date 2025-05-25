import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'

import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config'
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { TagModule } from './tag/tag.module';
import { LikeModule } from './like/like.module';
import { AuthModule } from './auth/auth.module';
import serverConfig from './config/server.config'
import hashConfig from './config/password.config'
import passwordConfig from './config/password.config'
import jwtConfig from './config/jwt.config'

@Module({
  controllers: [AppController],
  providers: [],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), 'apps/api/src/schema.gql'),
			sortSchema: true,
		}),
    ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [
				'.env.' + process.env.NODE_ENV + '.local',
				'.env.' + process.env.NODE_ENV,
				'.env.dist',
				'.env',
			],
			expandVariables: true,
			load: [serverConfig, hashConfig, passwordConfig, jwtConfig],
		}),
    PrismaModule,
    PostModule,
    UserModule,
    CommentModule,
    TagModule,
    LikeModule,
    AuthModule
  ],
})
export class AppModule {}
