import { FastifyRequest, FastifyReply } from 'fastify'
import { createProposal } from '../../../use-cases/proposals/create'

export async function create(request: FastifyRequest, res: FastifyReply) {
  const { body, headers } = request

  if (!headers['user-id']) {
    res.status(401).send({ message: 'Unauthorized' })
    return
  }

  const proposal = await createProposal({
    title: body.proposal.title,
    body: body.proposal.body,
    authorId: Number(headers['user-id'])
  })

  res.status(201).send(proposal)
}