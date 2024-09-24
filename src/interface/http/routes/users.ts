import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import * as UsersController from '../controllers/users'

export function create(fastify: FastifyInstance, _: FastifyPluginOptions, done: () => void) {
  fastify.post('/users', UsersController.create)

  done()
}
