import { fastify } from '../../../../src/interface/http/server';
import { prisma } from '../../../../src/connection';

describe('SignIn Controller', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany({})
  });

  describe('POST /sign', () => {
    describe('when user does not exist', () => {
      it('returns 422', async () => {
        const response = await fastify.inject({
          method: 'POST',
          url: '/signin',
          body: {
            email: 'foo@provider.com',
          }
        });
  
        expect(response.statusCode).toBe(422);
      });
    })

    describe('when user exists', () => {
      beforeEach(async () => {
        await prisma.user.create({
          data: {
            email: 'foo@provider.com',
            username: 'foo',
            birthDate: new Date('2000-01-01'),
          }
        })
      });
  
      it('returns JWT', async () => {
        const response = await fastify.inject({
          method: 'POST',
          url: '/signin',
          body: {
            email: 'foo@provider.com',
          }
        });
  
        expect(response.statusCode).toBe(201)
        expect(response.body).toMatchObject({
          token: expect.any(String)
        })
      })
    })
  });
});
