import type { Proposal as PrismaProposal } from '@prisma/client';
import { ApplicationError, ErrorCodes } from '../errors/application-error.ts';

export enum ProposalState {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

type Metadata = {
  // adminId: User['id'];
}

const ProposalStateTransitions = [{
  from: ProposalState.DRAFT,
  to: ProposalState.SUBMITTED,
}, {
  from: ProposalState.SUBMITTED,
  to: ProposalState.APPROVED,
}, {
  from: ProposalState.SUBMITTED,
  to: ProposalState.REJECTED,
},
{
  from: ProposalState.REJECTED,
  to: ProposalState.DRAFT
}]

export class Proposal implements PrismaProposal {
  id: number;
  title: string;
  body: string;
  state: string;
  authorId: number;

  constructor(proposal: PrismaProposal) {
    this.id = proposal.id;
    this.title = proposal.title;
    this.body = proposal.body;
    this.state = proposal.state;
    this.authorId = proposal.authorId;
  }

  submit() {
    this.transition(ProposalState.SUBMITTED, {});
    return this;
  }

  approve() {
    this.transition(ProposalState.APPROVED, {});
    return this;
  }

  reject() {
    this.transition(ProposalState.REJECTED, {});
    return this;
  }

  draft() {
    this.transition(ProposalState.DRAFT, {});
    return this;
  }

  private transition(newState: ProposalState, metadata: Metadata) {
    const transition = ProposalStateTransitions.find(transition => {
      return transition.from === this.state && transition.to === newState;
    });

    if (!transition) {
      throw new ApplicationError(ErrorCodes.BAD_REQUEST, `Cannot transition from ${this.state} to ${newState}`);
    }

    this.state = newState;
  }
}
