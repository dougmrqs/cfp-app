import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import * as UserRoutes from './users'
import * as ProposalRoutes from './proposals'
import { fastifyErrorHandler } from '../../../errors/fastify-error-handler';

export function routesPlugin(fastify: FastifyInstance, _: FastifyPluginOptions, done: () => void) {
  fastify.register(UserRoutes.create);
  fastify.register(ProposalRoutes.create);

  fastify.setErrorHandler((error) => {
    fastifyErrorHandler(error)
  });

  done();
}
