import { sleep } from './_lib/sleep.ts';
import { makeQueue } from './bullmq-worker/make-queue.ts';
import { makeWorker } from './bullmq-worker/make-worker.ts';

const q1 = makeQueue();

const worker = makeWorker();
worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

// // never processes jobs
// while(true) {
//   q1.add('myJob', {})
//   console.log('Adding job to queue');
//   sleep(2_000);
// }
