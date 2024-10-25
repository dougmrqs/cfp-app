import { Proposal } from '@prisma/client';
import { prisma } from '../connection';
import { ApplicationError } from '../errors/application-error';
import { ErrorCodes } from '../errors/application-error';

export enum ProposalState {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export class ProposalStateService {
  proposal: Proposal

  constructor(proposal: Proposal) {
    this.proposal = proposal
  }

  async submit(): Promise<Proposal> {
    if (this.proposal.state !== ProposalState.DRAFT) {
      throw new ApplicationError(ErrorCodes.BAD_REQUEST, `Cannot submit a ${this.proposal.state} proposal`)
    }

    return await prisma.proposal.update({where: {id: this.proposal.id}, data: {state: ProposalState.SUBMITTED}})
  }
}
