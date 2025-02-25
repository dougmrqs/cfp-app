import { FastifyReply, FastifyRequest } from 'fastify';
import { ProposalRepository } from '@repositories/proposal-repository';
import { approveProposal } from '@use-cases/proposals/approve';
import { rejectProposal } from '@use-cases/proposals/reject';

// POST '/proposals/:id/approve
export async function approve(request: FastifyRequest<{ Params: { proposalId: number }}>, reply: FastifyReply) {
  const { proposalId } = request.params;

  const proposal = await ProposalRepository().findById(Number(proposalId));

  const approvedProposal = await approveProposal(proposal);

  return reply.status(200).send(approvedProposal);
}

// POST '/proposals/:id/reject
export async function reject(request: FastifyRequest<{ Params: { proposalId: number }}>, reply: FastifyReply) {
  const { proposalId } = request.params;

  const proposal = await ProposalRepository().findById(Number(proposalId));

  const rejectedProposal = await rejectProposal(proposal);

  return reply.status(200).send(rejectedProposal);
}
