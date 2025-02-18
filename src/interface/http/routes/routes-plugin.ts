import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import * as UserRoutes from './users'
import { proposalRoutes } from './proposals'
import * as SignInRoutes from './signin'
import { fastifyErrorHandler } from '../../../errors/fastify-error-handler';

export function routesPlugin(fastify: FastifyInstance, _: FastifyPluginOptions, done: () => void) {
  fastify.register(UserRoutes.create);
  fastify.register(proposalRoutes);
  fastify.register(SignInRoutes.create)

  fastify.setErrorHandler((error) => {
    fastifyErrorHandler(error)
  });

  done();
}
