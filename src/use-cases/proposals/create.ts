import { Proposal, User } from '@prisma/client';
import { prisma } from '../../connection';

export async function createProposal(proposal: Omit<Proposal, 'id'>) {
  return await prisma.proposal.create({
    data: {
      ...proposal
    }
  })
}
