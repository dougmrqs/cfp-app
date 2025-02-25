import { FastifyRequest, FastifyReply } from "fastify";
import { createProposal } from "@use-cases/proposals/create";
import { UserRepository } from "@repositories/users-repository";
import {
  ApplicationError,
  ErrorCodes,
} from "@errors/application-error";
import { ProposalRepository } from '@repositories/proposal-repository';
import { submitProposal } from '@use-cases/proposals/submit';

type CreateRequestType = {
  Body: {
    proposal: {
      title: string;
      body: string;
    };
  };
};

export async function create(request: FastifyRequest<CreateRequestType>, res: FastifyReply) {
  const { body } = request;

  const { findById } = UserRepository();

  const userId: number = request.user.sub;
  const author = await findById(userId);

  if (!author) {
    throw new ApplicationError(ErrorCodes.NOT_FOUND, "User not found");
  }

  const proposal = await createProposal({
    title: body.proposal.title,
    body: body.proposal.body,
    authorId: author.id,
  });

  res.status(201).send(proposal);
}

// POST '/proposals/:id/submit
export async function submit(request: FastifyRequest<{ Params: { proposalId: number }}>, reply: FastifyReply) {
  const { proposalId } = request.params;

  const proposal = await ProposalRepository().findById(Number(proposalId));
  const user = await UserRepository().findById(request.user.sub);

  if (user?.id !== proposal.authorId) {
    throw new ApplicationError(ErrorCodes.FORBIDDEN_ACTION, "User cannot submit another user's proposal");
  }

  const submittedProposal = await submitProposal(proposal);

  return reply.status(200).send(submittedProposal);
}
