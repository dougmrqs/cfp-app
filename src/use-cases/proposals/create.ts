import type { Proposal } from '@prisma/client';
import { prisma } from '../../connection.ts';

import { ProposalState } from '../../domain/proposal.ts';

export async function createProposal(proposal: Omit<Proposal, 'id' | 'state'>) {
  return await prisma.proposal.create({
    data: {
      ...proposal,
      state: ProposalState.DRAFT
    }
  })
}
