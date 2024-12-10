import { createBullBoard as createBullBoardRoot } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { FastifyAdapter } from '@bull-board/fastify';
import { emailQueue } from '../../services/schedule-welcome-mail';

export const createBullBoardPlugin = () => {
  const serverAdapter = new FastifyAdapter();

  createBullBoardRoot({
    queues: [emailQueue].map((q) => new BullMQAdapter(q)),
    serverAdapter,
  });

  serverAdapter.setBasePath('/ui');

  return serverAdapter.registerPlugin();
}
