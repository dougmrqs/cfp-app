import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import * as UsersController from '../controllers/users'
import * as UserSchemas from './schemas/users'

const createSchema = {
  body: UserSchemas.create.body,
  response: UserSchemas.createResponse
}

export function create(fastify: FastifyInstance, _: FastifyPluginOptions, done: () => void) {
  fastify.post('/users', { schema: createSchema }, UsersController.create)

  done()
}
