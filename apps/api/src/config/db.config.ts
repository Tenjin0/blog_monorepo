import { IPasswordConfig } from "."
import { rawConfig } from './raw.config'
import { registerAs } from '@nestjs/config'

const password: () => IPasswordConfig = () => ({
  ...rawConfig().password,
})

export default registerAs('password', password)
