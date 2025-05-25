import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from '../prisma/prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { IJwtConfig } from '../config'
import { JwtStrategy } from './strategies/jwt.strategy'
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [
        ConfigService
      ],
      useFactory: (configService: ConfigService) => {
        return {
          // secret: configService.get<IJwtConfig>('jwt')?.secret as string,
          secretOrPrivateKey: configService.get<IJwtConfig>('jwt')?.secret as string,
          signOptions: {
            expiresIn: configService.get<IJwtConfig>('jwt')?.expireIn
          }
        }
      }
    })
  ],
  providers: [AuthResolver, AuthService, PrismaService, JwtStrategy],
})
export class AuthModule {}
