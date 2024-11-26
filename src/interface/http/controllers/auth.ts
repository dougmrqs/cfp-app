import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../connection'

type CreateBody = {
  email: string
}

export async function create(request: FastifyRequest<{ Body: CreateBody }>, reply: FastifyReply) {
  const user = await prisma.user.findFirst({ where: { email: request.body.email } })

  if (!user) {
    return reply.status(422).send('Unprocessable content')
  }

  const payload = {
    sub: user.id,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 300
  }

  const jwt = await reply.jwtSign(payload)

  return reply.setCookie('token', jwt).status(201).send({ token: jwt })
}
