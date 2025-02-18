import { Proposal } from '../../domain/proposal';
import { ProposalRepository } from '../../repositories/proposal-repository';

export async function submitProposal(proposal: Proposal) {
  return ProposalRepository().update(proposal.submit())
}
