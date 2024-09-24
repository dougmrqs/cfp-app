import { fastify } from '../../../../src/interface/http/server';
import { prisma } from '../../../../src/connection';

describe('UsersController', () => {
  beforeEach(async () => {
    await prisma.proposal.deleteMany({})
    await prisma.user.deleteMany({})  
  })

  describe('POST /users', () => {
    it('creates a user', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'foo',
          email: 'foo@provider.com',
          birthDate: new Date().toISOString()
        }
      });

      expect(response.statusCode).toBe(201);
      expect(response.json()).toMatchObject({
        id: expect.any(Number),
        username: 'foo',
        email: 'foo@provider.com'
      });
    });
  });
});
