import { prisma } from './connection'

export async function main() {
  const result = await prisma.user.create({
    data: {
      email: 'mail@provider.com',
      name: 'John Doe',
    },
  })

  console.log(result)
}
