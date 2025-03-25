import { User } from '@prisma/client';
import { prisma } from "../../../../../src/connection";
import { fastify } from "../../../../../src/interface/http/server";

describe("ProposalsController", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany({});
  });

  afterEach(async () => {
    vi.resetAllMocks();
    await prisma.user.deleteMany({});
  });

  describe('POST /proposals/:id/submit', () => {
    describe('when user IS authenticated', () => {
      let jwt: string;
      let user: User;
      
      beforeEach(async () => {
        const userEmail = "foo@provider.com";
        
        user = await prisma.user.create({
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

      describe('and the proposal exists', () => {
        let proposalId: number;

        beforeEach(async () => {
          const proposal = await prisma.proposal.create({
            data: {
              title: 'foo',
              body: 'bar',
              state: 'DRAFT',
              authorId: user.id,
            },
          });

          proposalId = proposal.id;
        });

        it('submits a proposal', async () => {
          const response = await fastify.inject({
            method: 'POST',
            url: `/proposals/${proposalId}/submit`,
            headers: {
              authorization: `Bearer ${jwt}`,
            }
          });

          expect(response.statusCode).toBe(200);
          expect(response.json()).toMatchObject(expect.objectContaining({
            state: 'SUBMITTED'
          }));
        });

        describe.each(['SUBMITTED', 'APPROVED', 'REJECTED'])('and the proposal is %s', (state) => {
          beforeEach(async () => {
            await prisma.proposal.update({
              where: { id: proposalId },
              data: { state },
            });
          });

          it('returns 400', async () => {
            const response = await fastify.inject({
              method: 'POST',
              url: `/proposals/${proposalId}/submit`,
              headers: {
                authorization: `Bearer ${jwt}`,
              }
            });

            expect(response.statusCode).toBe(400);
            expect(response.json()).toEqual({
              error: {
                code: 'BAD_REQUEST',
                message: `Cannot transition from ${state} to SUBMITTED`
              }
            })
          });
        });

        describe('but user is not the proposal owner', () => {
          let user2: User;

          beforeEach(async () => {
            const userEmail = "foo2@provider.com";
            
            user2 = await prisma.user.create({
              data: {
                username: "foo2",
                email: userEmail,
                birthDate: new Date("1991-01-01"),
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

          it('cannot submit another user\'s proposal', async () => {
            const response = await fastify.inject({
              method: 'POST',
              url: `/proposals/${proposalId}/submit`,
              headers: {
                authorization: `Bearer ${jwt}`,
              }
            });
  
            expect(response.statusCode).toBe(403);
            expect(response.json()).toEqual({
              error: {
                code: 'FORBIDDEN_ACTION',
                message: `User cannot submit another user's proposal`
              }
            });
          });
        });
      });

      describe('and the proposal does not exist', () => {
        it('returns 404', async () => {
          const response = await fastify.inject({
            method: 'POST',
            url: `/proposals/999/submit`,
            headers: {
              authorization: `Bearer ${jwt}`,
            }
          });

          expect(response.statusCode).toBe(404);
          expect(response.json()).toEqual({
            error: {
              code: 'NOT_FOUND',
              message: 'Proposal not found'
            }
          });
        });
      });

      describe('when id is not a number', () => {
        it('returns BAD REQUEST response', async () => {

          const response = await fastify.inject({
            method: 'POST',
            url: `/proposals/foo/submit`,
            headers: {
              authorization: `Bearer ${jwt}`,
            }
          });

          expect(response.statusCode).toBe(400);
          expect(response.json()).toEqual({
            error: {
              code: 'BAD_REQUEST',
              message: 'params/proposalId must be number'
            }
          });
        });
      });
    });

    describe.skip('when user IS NOT authenticated', () => {
      describe('without a token', () => {
        it('returns 401', async () => {
          const response = await fastify.inject({
            method: 'POST',
            url: '/proposals/1/submit',
          });

          expect(response.statusCode).toBe(401);
          // expect(response.json()).toEqual({
          //   error: {
          //     code: 'UNAUTHORIZED',
          //     message: 'Unauthorized'
          //   }
          // });
        });
      });

      describe('with an invalid token', () => {
        it('returns 401', async () => {
          const response = await fastify.inject({
            method: 'POST',
            url: '/proposals/1/submit',
            headers: {
              authorization: 'Bearer invalid',
            }
          });

          expect(response.statusCode).toBe(401);
          // expect(response.json()).toEqual({
          //   error: {
          //     code: 'UNAUTHORIZED',
          //     message: 'Unauthorized'
          //   }
          // });
        });
      });
    });
  });
});
