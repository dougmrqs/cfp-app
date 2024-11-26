import Fastify from 'fastify'
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import { helloWorld } from './routes/hello-world'
import * as Serializers from '../http/serializers'
import { ApplicationError } from '../../errors/application-error'
import { routesPlugin } from './routes/routes-plugin'
import { authenticate } from './decorators';

declare module "fastify" {
  interface FastifyInstance {
    authenticate(request: FastifyRequest, reply: FastifyReply): void
  }
}

export const fastify = Fastify({
  logger: true,
})

fastify.register(helloWorld)
fastify.register(fastifyCookie)
fastify.register(fastifyJwt, { secret: 'uorqueshope' })
fastify.decorate('authenticate', authenticate)
fastify.register(routesPlugin)

fastify.setErrorHandler((error, _, reply) => {
  if (error instanceof ApplicationError) {
    if (error.code === 'BAD_REQUEST') {
      reply.code(400).send(Serializers.serializeError(error))
    }

    if (error.code === 'CONFLICT') {
      reply.code(409).send(Serializers.serializeError(error))
    }

    if (error.code === 'UNKNOWN') {
      reply.code(500).send(Serializers.serializeError(error))
    }
  }

  reply.code(500).send('Internal server error')
})

export const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch(err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
