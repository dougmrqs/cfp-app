import Fastify from 'fastify'
import { helloWorld } from './routes/hello-world'
import * as UserRoutes from '../http/routes/users'
import * as ProposalRoutes from '../http/routes/proposals'

export const fastify = Fastify({
  logger: true
})

fastify.register(helloWorld)
fastify.register(UserRoutes.create)
fastify.register(ProposalRoutes.create)

export const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch(err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
