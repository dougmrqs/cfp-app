import { User } from '@prisma/client';
import { Proposal } from '../domain/proposal';
import { prisma } from '../connection';
import { ApplicationError, ErrorCodes } from '../errors/application-error';

export const ProposalRepository = () => {
  async function create({ title, body, author }: { title: string; body: string; author: User }) {
    prisma.proposal.create({
      data: {
        title,
        body,
        state: 'DRAFT',
        authorId: author.id,
      }
    });  
  }

  async function update(proposal: Proposal) {
    const updatedProposal = await prisma.proposal.update({
      where: { id: proposal.id },
      data: {
        title: proposal.title,
        body: proposal.body,
        state: proposal.state,
        authorId: proposal.authorId
      }
    });

    return new Proposal(updatedProposal);
  }

  async function findById(id: number): Promise<Proposal> {
    const proposal = await prisma.proposal.findFirst({ where: { id } });

    if (!proposal) {
      throw new ApplicationError(ErrorCodes.NOT_FOUND, 'Proposal not found');
    }

    return new Proposal(proposal);
  }

  return {
    create,
    update,
    findById
  }
}
