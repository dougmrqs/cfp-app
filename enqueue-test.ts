import { Queue } from 'bullmq';
import { config } from './src/config/config';

const myQueue = new Queue('foo', { connection: config.redis });

async function addJobs() {
  await myQueue.add('job', { success: true });
  await myQueue.add('job', { success: false });
}

addJobs().then(() => {
  console.log('Jobs added');
  process.exit(0);
})
.catch((err) => {
  console.error(err);
  process.exit(1);  
});
