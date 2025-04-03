import { Queue } from 'bullmq';
import { connection } from '../redis/connection.ts';

export const QUEUE_NAME = 'myQueue';

export const makeQueue = () => new Queue(QUEUE_NAME, {
  connection
});
