import { prisma } from './connection'
import { start } from './interface/http/server'

function main() { 
  return start()
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
      .then(() => process.exit(1))
})
