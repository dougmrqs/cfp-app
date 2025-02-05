import { FastifyRequest, FastifyReply } from "fastify";
import { createProposal } from "../../../use-cases/proposals/create";
import { UserRepository } from "../../../repositories/users-repository";
import {
  ApplicationError,
  ErrorCodes,
} from "../../../errors/application-error";
import { ProposalRepository } from '../../../repositories/proposal-repository';

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

export async function update(request: FastifyRequest<UpdateRequestType>, reply: FastifyReply) {
  const { id, action } = request.params;

  const userRepository = UserRepository();
  const proposalRepository = ProposalRepository();

  const userId: number = request.user.sub;
  const manager = await userRepository.findById(userId);
  const proposal = await proposalRepository.findById(Number(id));


}
