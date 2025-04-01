import { Worker, type SandboxedOptions } from 'bullmq';
import { connection } from '../redis/connection.ts';
import { sleep } from '../_lib/sleep.ts';

export const makeWorker = () => new Worker('myQueue', async (job) => {
  console.log('-- Processing job:', job.id);
  sleep(5_000);
}, {
  connection,
});

export const makeSandboxedWorker = 
  (path: string, config?: SandboxedOptions) => 
    new Worker('myQueue', path, { connection, ...config });
