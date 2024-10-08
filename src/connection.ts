import { PrismaClient } from '@prisma/client';

function makeClient() {
  console.log(process.env.DATABASE_URL)  
  return new PrismaClient({
    log: ['query']
  });
}

// TODO: ver se a conexão já foi aberta

export const prisma = makeClient();
