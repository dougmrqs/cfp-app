import { Proposal, User } from '@prisma/client';
import { prisma } from '../../connection';

import { ProposalState } from '../../services/proposal-state-service';

export async function createProposal(proposal: Omit<Proposal, 'id' | 'state'>) {
  return await prisma.proposal.create({
    data: {
      ...proposal,
      state: ProposalState.DRAFT
    }
  })
}
