import { prisma } from "../../../../../src/connection.ts";
import { fastify } from "../../../../../src/interface/http/server.ts";
import * as UserRepositoryModule from "../../../../../src/repositories/users-repository.ts";

describe("ProposalsController", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany({});
  });

  afterEach(async () => {
    vi.resetAllMocks();
    await prisma.user.deleteMany({});
  });

  describe("POST /proposals", () => {
    describe("when user IS authenticated", () => {
      let jwt: string;

      beforeEach(async () => {
        const userEmail = "foo@provider.com";

        await prisma.user.create({
          data: {
            username: "foo",
            email: userEmail,
            birthDate: new Date("1990-01-01"),
          },
        });

        const jwtResponse = await fastify.inject({
          method: "POST",
          url: "/signin",
          payload: {
            email: userEmail,
          },
        });

        jwt = jwtResponse.json().token;
      });

      it("creates a proposal", async () => {
        const response = await fastify.inject({
          method: "POST",
          url: "/proposals",
          headers: {
            authorization: `Bearer ${jwt}`,
          },
          payload: {
            proposal: {
              title: "foo",
              body: "bar",
            },
          },
        });

        expect(response.statusCode).toBe(201);
        expect(response.json()).toMatchObject({
          id: expect.any(Number),
          title: "foo",
          body: "bar",
        });
      });

      describe("but the user is not found", () => {
        beforeEach(() => {
          const mockUserRepository = {
            findById: vi.fn().mockResolvedValue(null),
          };
          vi.spyOn(UserRepositoryModule, "UserRepository").mockReturnValue(
            mockUserRepository
          );
        });
        it("returns 404", async () => {
          const response = await fastify.inject({
            method: "POST",
            url: "/proposals",
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
            payload: {
              proposal: {
                title: "foo",
                body: "bar",
              },
            },
          });

          expect(response.statusCode).toBe(404);
        });
      });

      describe("but the token is expired", () => {
        beforeEach(() => {
          vi.useFakeTimers();
        });

        afterEach(() => {
          vi.clearAllTimers();
        });

        it("returns 401", async () => {
          const FIVE_MINUTES = 1000 * 60 * 5;
          vi.advanceTimersByTime(FIVE_MINUTES);

          const response = await fastify.inject({
            method: "POST",
            url: "/proposals",
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
            payload: {
              proposal: {
                title: "foo",
                body: "bar",
              },
            },
          });

          expect(response.statusCode).toBe(401);
        });
      });
    });

    describe("when user IS NOT authenticated", () => {
      describe("without a token", () => {
        it("returns 401", async () => {
          const response = await fastify.inject({
            method: "POST",
            url: "/proposals",
            payload: {
              proposal: {
                title: "foo",
                body: "bar",
              },
            },
          });

          expect(response.statusCode).toBe(401);
        });
      });

      describe("with an invalid token", () => {
        it("returns 401", async () => {
          const response = await fastify.inject({
            method: "POST",
            url: "/proposals",
            headers: {
              Authorization: "Bearer invalid",
            },
            payload: {
              proposal: {
                title: "foo",
                body: "bar",
              },
            },
          });

          expect(response.statusCode).toBe(401);
        });
      });
    });
  });
});
