import path from 'path';
import { makeQueue } from './bullmq-worker/make-queue.ts';
import { makeSandboxedWorker } from './bullmq-worker/make-worker.ts';
import { fileURLToPath } from 'url';
import { logger } from './_lib/logger.ts';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const processorPath = path.join(__dirname, './bullmq-worker/processor.ts');

// const q1 = makeQueue();
const w1 = makeSandboxedWorker(processorPath, { useWorkerThreads: true });
// const w1 = makeSandboxedWorker(processorPath);

// await q1.add('myJob', {});

w1.on('completed', (job) => {
  logger.logWorker(`Job ${job.id} completed`);
});

process.on('SIGINT', async () => {
  await w1.close();
  process.exit(0);
});
