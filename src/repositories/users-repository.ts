import type { User } from "@prisma/client";
import { prisma } from "../connection.ts";

export const UserRepository = () => {
  const create = () => {
    // TODO
  };

  const findById = async (id: number): Promise<User | null> =>
    await prisma.user.findFirst({ where: { id } });

  return { findById };
};
