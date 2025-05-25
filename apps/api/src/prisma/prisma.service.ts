import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
		super({ log: ['query', 'warn', 'info', 'error'] })
	}
	async onModuleInit() {
		await this.$connect()
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async enableShutDownHooks(app: INestApplication) {
		console.log('enableShutDownHooks')
	}
}
