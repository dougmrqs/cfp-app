import { FastifyRequest, FastifyReply } from 'fastify'

export function show (req: FastifyRequest, res: FastifyReply) {
  res.send({ hello: 'world' })
}
