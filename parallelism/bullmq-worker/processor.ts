import type { SandboxedJob } from 'bullmq';
import { sleep } from '../_lib/sleep.ts';

export default function (job: SandboxedJob) {
  console.log('-- Processing job:', job.id);
  sleep(5_000);
}
