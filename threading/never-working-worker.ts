import { makeQueue } from './worker/make-queue.ts';
import { makeWorker } from './worker/make-worker.ts';

const q1 = makeQueue();

const sleep = (ms: number) => {
  const start = performance.now();

  while(performance.now() - start < ms) {}
}

const worker = makeWorker();
worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

// never processes jobs
while(true) {
  q1.add('myJob', {})
  console.log('Adding job to queue');
  sleep(2_000);
}
