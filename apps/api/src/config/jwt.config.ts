import { IJwtConfig, IPasswordConfig } from "."
import { rawConfig } from './raw.config'
import { registerAs } from '@nestjs/config'

const jwt: () => IJwtConfig = () => ({
  ...rawConfig().jwt,
})

export default registerAs('jwt', jwt)
