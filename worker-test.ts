import { Worker } from 'bullmq';
import { config } from './src/config/config';

const worker = new Worker('foo', async job => {
  console.log(job.data);  
}, { connection: config.redis });

worker.on('completed', job => {
  console.log(`${job.id} has completed`);
})

worker.on('failed', (job, err) => {
  console.log(`${job?.id} has failed you are a terrible programmer`);
})
