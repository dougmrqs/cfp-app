import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import { show } from '../controllers/hello-world'

export function helloWorld(fastify: FastifyInstance, _: FastifyPluginOptions, done: () => void) {
  fastify.get('/hello-world', show)

  done()
}