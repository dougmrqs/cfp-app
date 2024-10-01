import { FastifyRequest, FastifyReply } from 'fastify'
import { createUser } from '../../../use-cases/users/create'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { body } = request

  const user = await createUser({
    email: body.email,
    username: body.username,
    birthDate: body.birthDate
  })

  reply.status(201).send(user)
}
