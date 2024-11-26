import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import * as AuthController from '../controllers/auth'

export function create(fastify: FastifyInstance, _: FastifyPluginOptions, done: () => void) {
  fastify.post('/signin', {}, AuthController.create)

  done() // done is used to finish the plugin loading process only.
}
