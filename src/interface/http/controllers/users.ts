import type { FastifyRequest, FastifyReply } from 'fastify'
import { createUser } from '../../../use-cases/users/create.ts'

type CreateBody = {
  email: string,
  username: string,
  birthDate: string
}

export async function create(request: FastifyRequest<{ Body: CreateBody }>, reply: FastifyReply) {
  const { body } = request

  const user = await createUser({
    email: body.email,
    username: body.username,
    birthDate: new Date(body.birthDate)
  })

  reply.status(201).send(user)
}
