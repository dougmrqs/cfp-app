import { logger } from './_lib/logger.ts';
import { sleep } from './_lib/sleep.ts';
import { makeQueue } from './bullmq-worker/make-queue.ts';
import { makeWorker } from './bullmq-worker/make-worker.ts';

const q1 = makeQueue();

const worker = makeWorker();
worker.on('completed', (job) => {
  logger.logWorker(`Job ${job.id} completed`);
});

// never processes jobs
while(true) {
  logger.logQueue('Adding job to queue');
  await q1.add('myJob', {}).then((job) => logger.logQueue(`Job ${job.id} added`)).then(() => sleep(500));
  sleep(5_000);
}
