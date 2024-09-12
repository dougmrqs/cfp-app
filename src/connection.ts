import { PrismaClient } from '@prisma/client';

function makeClient() {
  console.log(process.env.DATABASE_URL)  
  return new PrismaClient();
}

export const prisma = makeClient();
