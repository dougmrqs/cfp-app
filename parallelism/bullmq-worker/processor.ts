import type { SandboxedJob } from 'bullmq';
import { sleep } from '../_lib/sleep.ts';
import { logger } from '../_lib/logger.ts';

export default function (job: SandboxedJob) {
  logger.logWorker(`-- Processing job: ${job.id}`);
  sleep(5_000);
}
