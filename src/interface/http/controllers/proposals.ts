import { FastifyRequest, FastifyReply } from 'fastify'
import { createProposal } from '../../../use-cases/proposals/create'
import { UserRepository } from '../../../repositories/users-repository'
import { ApplicationError, ErrorCodes } from '../../../errors/application-error'

export async function create(request: FastifyRequest, res: FastifyReply) {
  const { body } = request

  console.log('request.user', request.user)
  const userId: number = request.user.sub
  const author = await UserRepository.findById(userId)

  console.log('author', author)
  if (!author) {
    throw new ApplicationError(ErrorCodes.NOT_FOUND, 'User not found')
  }

  const proposal = await createProposal({
    title: body.proposal.title,
    body: body.proposal.body,
    authorId: author.id
  })

  res.status(201).send(proposal)
}
