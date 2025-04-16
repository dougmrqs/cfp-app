import type { FastifyRequest, FastifyReply } from 'fastify'
import { createUser } from '../../../use-cases/users/create.ts'
import { PasswordEncrypter } from '../../../security/encrypt-password.ts'

type CreateBody = {
  email: string,
  username: string,
  birthDate: string,
  password: string;
}

export async function create(request: FastifyRequest<{ Body: CreateBody }>, reply: FastifyReply) {
  const { body } = request

  const passwordHash = PasswordEncrypter.encrypt(body.password)

  const user = await createUser({
    email: body.email,
    username: body.username,
    birthDate: new Date(body.birthDate),
    passwordHash: passwordHash
  })

  reply.status(201).send({ ...user, passwordHash: passwordHash })
}
