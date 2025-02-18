import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import * as ProposalsController from '../controllers/proposals'

const transitionSchema = {
  type: 'object',
  params: {
    id: { type: 'string' }
  }
}

export function proposalRoutes(fastify: FastifyInstance, _: FastifyPluginOptions, done: () => void) {
  fastify.post('/proposals', { onRequest: [fastify.authenticate] }, ProposalsController.create);
  fastify.post<{ Params: { id: string }}>('/proposals/:id/submit', { schema: transitionSchema, onRequest: [fastify.authenticate] }, ProposalsController.submit);
  fastify.post<{ Params: { id: string }}>('/proposals/:id/approve', { onRequest: [fastify.authenticate] }, ProposalsController.approve);
  fastify.post<{ Params: { id: string }}>('/proposals/:id/reject', { onRequest: [fastify.authenticate] }, ProposalsController.reject);

  done();
}
