import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import * as ProposalsController from '@controllers/admin/proposals'

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
  fastify.post('/proposals/:proposalId/approve', { schema: transitionSchema, onRequest: [fastify.authenticate] }, ProposalsController.approve);

  fastify.post('/proposals/:proposalId/reject', { schema: transitionSchema, onRequest: [fastify.authenticate] }, ProposalsController.reject);

  done();
}
