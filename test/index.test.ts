import { main } from '../src/create-user';
import { prisma } from '../src/connection';

describe("Hello World", () => {
  afterAll(async () => {
    await prisma.user.deleteMany()
  });

  it("shows Hello World", async () => {
    await main()
  });
});
