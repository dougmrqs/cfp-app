import { User } from '@prisma/client';
import { prisma } from '../../connection';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

class ApplicationError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message)
    this.code = code
  }
}

function handlePrismaError(error: PrismaClientKnownRequestError) {
  if (error.code === 'P2002'){
    throw new ApplicationError('CONFLICT', error.message)
  }

  throw error
}


export async function createUser(user: Omit<User, 'id'>) {
  try {
    return await prisma.user.create({data: user})
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError){
      handlePrismaError(error)
    }
  }
}
