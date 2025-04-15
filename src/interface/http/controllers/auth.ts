import type { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../connection.ts'
import { PasswordEncrypter } from '../../../security/encrypt-password.ts'

type CreateBody = {
  email: string
  password: string
}

export async function create(request: FastifyRequest<{ Body: CreateBody }>, reply: FastifyReply) {
  const { body } = request

  const user = await prisma.user.findFirst({ where: { email: body.email } })

  if (!user) {
    return reply.status(422).send('Unprocessable content')
  }

  if (!PasswordEncrypter.compare(body.password, user.passwordHash)) {
    // return reply.status(422).send('Unprocessable content')
    return reply.status(401).send('Password errado')
  }

  const payload = {
    sub: user.id,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 300
  }

  const jwt = await reply.jwtSign(payload)

  return reply.setCookie('token', jwt).status(201).send({ token: jwt })
}
