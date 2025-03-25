import type { FastifyError } from 'fastify';
import { ApplicationError, ErrorCodes } from './application-error.ts';

export function fastifyErrorHandler(error: FastifyError) {
  if (error.code === 'FST_ERR_VALIDATION') {
    throw new ApplicationError(ErrorCodes.BAD_REQUEST, serializeMessage(error.message))
  }

  throw error
}

function serializeMessage(message: string) {
  return message.replace('body/', '').replace(/must match pattern.*$/, 'must be valid')
}
