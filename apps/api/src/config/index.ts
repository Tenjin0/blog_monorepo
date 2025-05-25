export interface IPasswordConfig {
	salt: number
  pepper: string
}

export interface IServerConfig {
	port: number
}

export interface IDBConfig {
  url: string
}
export interface IJwtConfig {
  secret: string
  expireIn: string
}
export interface IConfig {
  server : IServerConfig
  password: IPasswordConfig
  db: IDBConfig
  jwt: IJwtConfig
}
