import { IConfig } from "."

export const rawConfig = () => {

  const config: IConfig = {
    password: {
      salt: 10,
      pepper: process.env.SECRET_PEPPER ?? ""
    },
    server: {
      port: process.env.API_PORT ? parseInt(process.env.API_PORT as string, 10) : 3000
    },
    db: {
      url: process.env.DATABASE_URL as string
    },
    jwt: {
      secret: process.env.JWT_SECRET as string,
      expireIn: process.env.JWT_EXPIRES_IN as string
    }
  }

  return config
}
