import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInInput } from './dto/signin.input'
import { PrismaService } from '../prisma/prisma.service'
import { validatePassword } from '../common/functions/validate_password'
import PasswordConfig from '../config/password.config'
import * as config from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { User } from '../user/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService,
    @Inject(PasswordConfig.KEY)
    private passwordConfig: config.ConfigType<typeof PasswordConfig>,
    private jwtService: JwtService
  ) {}
  async validateLocalUser({email, password}: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      }
    })
    if (!user) throw new UnauthorizedException('User Not Found')

    await validatePassword(password, user.password, this.passwordConfig.pepper)
    return user as unknown as User
  }
  async generateToken(id: number) {
    const accessToken = await this.jwtService.signAsync({sub: id})
    return {accessToken}
  }


  async login(user: User) {
    const { accessToken } = await this.generateToken(user.id)
    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      access_token: accessToken
    }
  }

  async validateUserById(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    })
    if (!user) throw new UnauthorizedException('User not Found')
    const currentUser = {id: user.id}
    return currentUser
  }
}
