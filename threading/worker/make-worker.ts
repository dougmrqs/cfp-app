import { Worker } from 'bullmq';
import { connection } from '../redis/connection.ts';

export const makeWorker = () => new Worker('myQueue', async (job) => {
  console.log('-- Processing job:', job.id);
}, {
  connection,
});
