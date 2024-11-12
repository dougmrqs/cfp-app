import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../../../connection'

type CreateBody = {
  email: string
}

const FIVE_MINUTES_IN_SECONDS = 300

const AuthController = {
  create: async (request: FastifyRequest<{ Body: CreateBody }>, reply: FastifyReply) => {
    const user = await prisma.user.findFirst({ where: { email: request.body.email } })

    if (!user) {
      return reply.status(422).send('Unprocessable content')
    }

    const payload = {
      sub: user.id,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + FIVE_MINUTES_IN_SECONDS
    }

    const jwt = await reply.jwtSign(payload)

    return reply.setCookie('token', jwt).status(201).send({ token: jwt })
  }
}

export function create(fastify: FastifyInstance, _: FastifyPluginOptions, done: () => void) {
  fastify.post('/signin', {}, AuthController.create)

  done()
}
