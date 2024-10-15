import { ApplicationError } from '../../../errors/application-error'

export function serializeError(error: ApplicationError) {
  return {
    error: {
      code: error.code,
      message: error.message
    }
  }
}
