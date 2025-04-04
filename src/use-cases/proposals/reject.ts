import { Proposal } from '../../domain/proposal';
import { ProposalRepository } from '../../repositories/proposal-repository';

export async function rejectProposal(proposal: Proposal) {
  return ProposalRepository().update(proposal.reject())
}
