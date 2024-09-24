import { FastifyRequest, FastifyReply } from 'fastify'
import { createUser } from '../../../use-cases/users/create'

export async function create(request: FastifyRequest, res: FastifyReply) {
  const { body } = request

  const user = await createUser({
    email: body.email,
    username: body.username,
    birthDate: body.birthDate
  })

  res.status(201).send(user)
}
