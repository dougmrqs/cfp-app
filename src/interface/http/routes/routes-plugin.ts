import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

import * as UserRoutes from './users.ts'
import { proposalRoutes } from './proposals.ts'
import * as SignInRoutes from './signin.ts'
import { fastifyErrorHandler } from '../../../errors/fastify-error-handler.ts';

export function routesPlugin(fastify: FastifyInstance, _: FastifyPluginOptions, done: () => void) {
  fastify.register(UserRoutes.create);
  fastify.register(proposalRoutes);
  fastify.register(SignInRoutes.create)

  fastify.setErrorHandler((error) => {
    fastifyErrorHandler(error)
  });

  done();
}
