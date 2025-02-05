import { User } from '@prisma/client';
import { prisma } from '../../connection';
import { handlePrismaError } from '../../errors/prisma-error-handler';
import { ApplicationError, ErrorCodes } from '../../errors/application-error';
import { scheduleWelcomeEmail } from '../../services/schedule-welcome-mail';

export async function createUser(user: Omit<User, 'id'>) {
  try {
    validateUser(user)

    const newUser =  await prisma.user.create({ data: user })

    await scheduleWelcomeEmail(newUser);

    return newUser;
  } catch (error) {
    if (error instanceof Error) {
      handlePrismaError(error)
    }

    throw error
  }
}

function validateUser(user: Omit<User, 'id'>) {
  // TODO: use a date library to handle dates. i.e. date-fns or luxon
  const EIGHTEEN_YEARS_AGO = new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000)

  if (user.birthDate > EIGHTEEN_YEARS_AGO) {
    throw new ApplicationError(ErrorCodes.BAD_REQUEST, 'User must be at least 18 years old')
  }
}
