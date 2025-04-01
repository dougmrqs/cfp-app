import path, { dirname } from 'path';
import { makeQueue } from './bullmq-worker/make-queue.ts';
import { makeSandboxedWorker } from './bullmq-worker/make-worker.ts';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const processorPath = path.join(__dirname, './worker/processor.ts');

const q1 = makeQueue();
const w1 = makeSandboxedWorker(processorPath, { });

await q1.add('myJob', {});

w1.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});
