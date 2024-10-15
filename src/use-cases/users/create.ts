import { User } from '@prisma/client';
import { prisma } from '../../connection';
import { handlePrismaError } from '../../errors/prisma-error-handler';
import { ApplicationError, ErrorCodes } from '../../errors/application-error';

export async function createUser(user: Omit<User, 'id'>) {
  try {
    validateUser(user)

    return await prisma.user.create({ data: user })
  } catch (error) {
    if (error instanceof Error) {
      handlePrismaError(error)
    }

    throw error
  }
}

function validateUser(user: Omit<User, 'id'>) {
  const EIGHTEEN_YEARS_AGO = new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000)  

  if (new Date(user.birthDate) > EIGHTEEN_YEARS_AGO) {
    throw new ApplicationError(ErrorCodes.BAD_REQUEST, 'User must be at least 18 years old')
  }
}
