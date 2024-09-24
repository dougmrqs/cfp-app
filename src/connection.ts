import { PrismaClient } from '@prisma/client';

function makeClient() {
  console.log(process.env.DATABASE_URL)  
  return new PrismaClient({
    log: ['query']
  });
}

export const prisma = makeClient();
