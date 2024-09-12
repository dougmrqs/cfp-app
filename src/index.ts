import { prisma } from './connection'
import { main } from './create-user'

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
      .then(() => process.exit(1))
})
