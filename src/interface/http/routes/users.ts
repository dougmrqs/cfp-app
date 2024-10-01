import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import * as UsersController from '../controllers/users'
import * as UserSchemas from './schemas/users'

import * as Serializers from '../serializers'

const createSchema = {
  body: UserSchemas.create.body,
  response: UserSchemas.createResponse
}

export function create(fastify: FastifyInstance, _: FastifyPluginOptions, done: () => void) {
  fastify.post('/users', { schema: createSchema }, UsersController.create)

  fastify.setErrorHandler((error, _, reply) => {
    if (error.validation) {
      reply.status(400).send(Serializers.serializeError(error))
    } else {
      throw error
    }
  })

  done()
}
