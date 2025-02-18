import { Proposal } from '../../domain/proposal';
import { ProposalRepository } from '../../repositories/proposal-repository';

export async function approveProposal(proposal: Proposal) {
  return ProposalRepository().update(proposal.approve())
}
