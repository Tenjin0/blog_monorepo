import { IServerConfig } from "."
import { rawConfig } from './raw.config'
import { registerAs } from '@nestjs/config'

const server: () => IServerConfig = () => ({
  ...rawConfig().server,
})

export default registerAs('server', server)
