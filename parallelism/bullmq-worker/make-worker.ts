import { Worker, type SandboxedOptions } from 'bullmq';
import { connection } from '../redis/connection.ts';
import { sleep } from '../_lib/sleep.ts';
import { delay } from '../_lib/delay.ts';
import { QUEUE_NAME } from './make-queue.ts';
import { logger } from '../_lib/logger.ts';

export const makeWorker = () => new Worker(QUEUE_NAME, async (job) => {
  logger.logWorker(`Processing job: ${job.id}`);
  await delay(5_000);
}, {
  connection,
  concurrency: 10,
});

export const makeSandboxedWorker = 
  (path: string, config?: SandboxedOptions) => 
    new Worker(QUEUE_NAME, path, { connection, ...config });
