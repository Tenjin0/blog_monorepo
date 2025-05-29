import { Prisma, PrismaClient } from "@prisma/client"
import { faker } from '@faker-js/faker'

import { generateSlug } from "../src/common/functions/generate_slug"

require('dotenv').config({
	path: [dirname(__dirname) + '/.env', dirname(__dirname) + '/.env.' + process.env.NODE_ENV,  dirname(__dirname) + '/.env.' + process.env.NODE_ENV + '.local'],
	override: true,
})

import { hashPassword } from '../src/common/functions/hash_password'
import { rawConfig } from '../src/config/raw.config'
import { dirname } from "path"
console.log(dirname(__dirname), process.env.NODE_ENV )


const configService = {
	get: (header) => {
		const config = rawConfig()
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return config[header]
	},
}

const prisma = new PrismaClient({datasourceUrl: configService.get('db').url })

async function main() {
  const users = Array.from({length: 10}).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email().toLocaleLowerCase(),
    bio: faker.lorem.sentence(),
    avatar: faker.image.avatar(),
    password: hashPassword('test', configService.get("password").salt, configService.get("password").pepper)
  }))
  users.push({
    name: faker.person.fullName(),
    email: 'petitpatrice@gmail.com',
    bio: faker.lorem.sentence(),
    avatar: faker.image.avatar(),
    password: hashPassword('superadmin', configService.get("password").salt, configService.get("password").pepper)
  })
  await prisma.user.createMany({ data: users})

  const posts = Array.from({length: 40}).map(() => {
    const title = faker.lorem.sentence()
    return {
      title,
      slug: generateSlug(title),
      content: faker.lorem.paragraph(3),
      thumbnail: faker.image.avatar(),
      authorId: faker.number.int({ min: 1, max: 10})
    }
  })
  Promise.all(
    posts.map(
      (post) => {
        return prisma.post.create({
          data: {
            ...post,
            comments: {
              createMany: {
                data: Array.from({length: 20}).map(() => ({
                    content: faker.lorem.sentence(),
                    authorId: faker.number.int({min: 1, max: 10})
                  }))

              }
            }
          }
        })
      }
    )
  )

  console.log('Seeding completed !')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
