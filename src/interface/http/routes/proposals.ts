import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import * as ProposalsController from '../controllers/proposals.ts'

const transitionSchema = {
  type: 'object',
  params: {
    type: 'object',
    properties: {
      proposalId: { type: 'number' }
    }
  },
  required: ['proposalId']
}

export function proposalRoutes(fastify: FastifyInstance, _: FastifyPluginOptions, done: () => void) {
  fastify.post('/proposals', { onRequest: [fastify.authenticate] }, ProposalsController.create);

  fastify.post('/proposals/:proposalId/submit', { schema: transitionSchema, onRequest: [fastify.authenticate] }, ProposalsController.submit);

  done();
}
