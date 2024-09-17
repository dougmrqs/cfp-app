import { User } from '@prisma/client';
import { prisma } from '../../connection';

export async function createUser(user: Omit<User, 'id'>) {
  return await prisma.user.create({data: user})
}
