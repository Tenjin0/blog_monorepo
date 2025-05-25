import { UnauthorizedException } from '@nestjs/common'
import { compare } from 'bcrypt'


export async function validatePassword(password: string, hashedPassword: string, prefix?: string) {
  const isPasswordMatched = await compare(prefix + password, hashedPassword)
  if (!isPasswordMatched) throw new UnauthorizedException('Invalid Creditentials')
}
