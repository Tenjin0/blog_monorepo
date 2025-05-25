import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../prisma/prisma.service'
import { hashPassword } from '../common/functions/hash_password'
import PasswordConfig from '../config/password.config'
import * as config from '@nestjs/config'

@Injectable()
export class UserService {

  constructor(
    private prisma: PrismaService,
    @Inject(PasswordConfig.KEY)
    private passwordConfig: config.ConfigType<typeof PasswordConfig>,
  ) {}
  create(createUserInput: CreateUserInput) {

    const {password, ...user} = createUserInput
    const hashedPassword = hashPassword(password, this.passwordConfig.salt, this.passwordConfig.pepper)
    return this.prisma.user.create({
      data : {
        password: hashedPassword,
        ...user
      }
    })
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
