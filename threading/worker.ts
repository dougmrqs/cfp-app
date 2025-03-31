import { Queue, Worker } from 'bullmq';

const makeWorker = () => new Worker('myQueue', async (job) => {
  console.log('Processing job:', job.id);
}, {
  connection: {
    host: 'localhost',
    port: 6379,
  },
});

const makeQueue = () => new Queue('myQueue', {
  connection: {
    host: 'localhost',
    port: 6379,
  },
});

const q1 = makeQueue();

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const workers = []

while(true) {
  q1.add('myJob', {})
  await delay(2_000);

  const worker = makeWorker();
  workers.push(worker);
  worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed`);
  });

  const workersCount = workers.length;
  console.log(`Workers count: ${workersCount}`);
}
