import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import * as ProposalsController from '../controllers/proposals'

export function create(fastify: FastifyInstance, _: FastifyPluginOptions, done: () => void) {
  fastify.post('/proposals', { onRequest: [fastify.authenticate] }, ProposalsController.create);

  done();
}
