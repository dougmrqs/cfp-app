import type { User } from '@prisma/client';
import { Queue } from 'bullmq';

export const emailQueue = new Queue('email');

export async function scheduleWelcomeEmail(user: User) {
  await emailQueue.add('user_created', { to: user.email });
}
