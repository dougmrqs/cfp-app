import { FastifyRequest, FastifyReply } from "fastify";
import { createProposal } from "../../../use-cases/proposals/create";
import { UserRepository } from "../../../repositories/users-repository";
import {
  ApplicationError,
  ErrorCodes,
} from "../../../errors/application-error";
import { ProposalRepository } from '../../../repositories/proposal-repository';
import { submitProposal } from '../../../use-cases/proposals/submit';
import { approveProposal } from '../../../use-cases/proposals/approve';
import { rejectProposal } from '../../../use-cases/proposals/reject';

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

type UpdateRequestType = {
  Body: unknown;
  Params: {
    // TODO: validate these in a middleware
    id: string;
    action: string;
  };
}

// PATCH '/proposals/:id'
export async function update(request: FastifyRequest<UpdateRequestType>, reply: FastifyReply) {
  const { id, action } = request.params;

  const userRepository = UserRepository();
  const proposalRepository = ProposalRepository();

  const userId: number = request.user.sub;
  const manager = await userRepository.findById(userId);
  const proposal = await proposalRepository.findById(Number(id));
}

// POST '/proposals/:id/submit
export async function submit(request: FastifyRequest<{ Params: { id: string }}>, reply: FastifyReply) {
  const { id } = request.params;

  const proposal = await ProposalRepository().findById(Number(id));

  const submittedProposal = await submitProposal(proposal);

  return reply.status(200).send(submittedProposal);
}

// POST '/proposals/:id/approve
export async function approve(request: FastifyRequest<{ Params: { id: string }}>, reply: FastifyReply) {
  const { id } = request.params;

  const proposal = await ProposalRepository().findById(Number(id));

  const approvedProposal = await approveProposal(proposal);

  return reply.status(200).send(approvedProposal);
}

// POST '/proposals/:id/reject
export async function reject(request: FastifyRequest<{ Params: { id: string }}>, reply: FastifyReply) {
  const { id } = request.params;

  const proposal = await ProposalRepository().findById(Number(id));

  const rejectedProposal = await rejectProposal(proposal);

  return reply.status(200).send(rejectedProposal);
}
