import { FastifyRequest, FastifyReply } from 'fastify'
import { createProposal } from '../../../use-cases/proposals/create'
import { prisma } from '../../../connection'
import { UserRepository } from '../../../repositories/users-repository'

export async function create(request: FastifyRequest, res: FastifyReply) {
  const { body } = request

  const author = await UserRepository.findById(Number(request.user.sub))

  // if (!author) {
  //   res.status(401).send()
  //   return
  // }

  const proposal = await createProposal({
    title: body.proposal.title,
    body: body.proposal.body,
    authorId: author!.id // remove this ! crime
  })

  res.status(201).send(proposal)
}
