import * as bcrypt from 'bcrypt'


export function hashPassword(password: string, saltLength: number, prefix?: string): string {
  const salt =  bcrypt.genSaltSync(saltLength)
  const hash: string = bcrypt.hashSync(prefix + password, salt)
  return hash
}
