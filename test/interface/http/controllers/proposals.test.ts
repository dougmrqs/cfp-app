import { prisma } from '../../../../src/connection';
import { fastify } from '../../../../src/interface/http/server';

describe('ProposalsController', () => {
  beforeEach(async () => {
    await prisma.proposal.deleteMany({})
    await prisma.user.deleteMany({})  
  })

  describe('POST /proposals', () => {
    it('creates a proposal', async () => {
      const user = await prisma.user.create({
        data: {
          username: 'foo',
          email: 'foo@provider.com',
          birthDate: new Date()
        }
      });

      const response = await fastify.inject({
        method: 'POST',
        url: '/proposals',
        headers: {
          'user-id': user.id.toString()
        },
        payload: {
          proposal: {
            title: 'foo',
            body: 'bar',
          }
        }
      });

      expect(response.statusCode).toBe(201);
      expect(response.json()).toMatchObject({
        id: expect.any(Number),
        title: 'foo',
        body: 'bar'
      });
    });

    describe('when user is not authenticated', () => {
      it('returns 401', async () => {
        const response = await fastify.inject({
          method: 'POST',
          url: '/proposals',
          payload: {
            proposal: {
              title: 'foo',
              body: 'bar',
            }
          }
        });
  
        expect(response.statusCode).toBe(401);
      });
    });
  });
});
