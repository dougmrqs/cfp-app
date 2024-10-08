import Fastify from 'fastify'
import { helloWorld } from './routes/hello-world'
import * as UserRoutes from '../http/routes/users'
import * as ProposalRoutes from '../http/routes/proposals'
import * as Serializers from '../http/serializers'

export const fastify = Fastify({
  logger: true
})

fastify.register(helloWorld)
fastify.register(UserRoutes.create)
fastify.register(ProposalRoutes.create)

fastify.setErrorHandler((error, _, reply) => {
  if (error.code === 'CONFLICT') {
    reply.status(409).send(Serializers.serializeError(error))
  } else {
    throw error
  }
})

export const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch(err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
