import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ApplicationError, ErrorCodes } from './application-error'

export function handlePrismaError(error: Error) {
  if (error instanceof PrismaClientKnownRequestError){
    if (error.code === 'P2002'){
      const faultyField = (error.meta?.target as string[]).join(', ')
      throw new ApplicationError(ErrorCodes.CONFLICT, `${faultyField} already taken`)
    }
  }

  throw error
}
