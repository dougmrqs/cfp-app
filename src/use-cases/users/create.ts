import { User } from '@prisma/client';
import { prisma } from '../../connection';
import { handlePrismaError } from '../../errors/prisma-error-handler';

export async function createUser(user: Omit<User, 'id'>) {
  try {
    return await prisma.user.create({ data: user })
  } catch (error) {
    if (error instanceof Error) {
      handlePrismaError(error)
    }

    throw error
  }
}
