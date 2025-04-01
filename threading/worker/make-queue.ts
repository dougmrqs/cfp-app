import { Queue } from 'bullmq';
import { connection } from '../redis/connection.ts';

export const makeQueue = () => new Queue('myQueue', {
  connection
});
