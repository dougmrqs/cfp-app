import { User } from '@prisma/client';
import { prisma } from "../connection";

export namespace UserRepository {
  export async function create() {
    // TODO
  }

  export async function findById(id: number): Promise<User | null> {
    return await prisma.user.findFirst({ where: { id } });
  }
}
