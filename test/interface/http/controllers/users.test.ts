import { fastify } from '../../../../src/interface/http/server.ts';
import { prisma } from '../../../../src/connection.ts';

describe('UsersController', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany({})  
  });

  const makeValidUser = () => ({
    username: 'foo',
    email: 'foo@provider.com',
    birthDate: new Date('1990-01-01').toISOString()
  });

  describe('POST /users', () => {
    it('creates a user', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/users',
        payload: makeValidUser()
      });

      expect(response.statusCode).toBe(201);
      expect(response.json()).toMatchObject({
        id: expect.any(String),
        username: 'foo',
        email: 'foo@provider.com'
      });
    });

    describe('when email is already taken', () => {
      beforeEach(async () => {
        await prisma.user.create({
          data: makeValidUser()
        });
      });

      it('returns bad request and error object', async () => {
        const response = await fastify.inject({
          method: 'POST',
          url: '/users',
          payload: makeValidUser()
        });

        expect(response.statusCode).toBe(409);
        expect(response.json()).toMatchObject({
          error: {
            code: 'CONFLICT',
            message: 'email already taken'
          }
        });
      });
    });

    describe('when email is invalid', () => {
      it('returns bad request and error object', async () => {
        const response = await fastify.inject({
          method: 'POST',
          url: '/users',
          payload: {
            ...makeValidUser(),
            email: 'invalid-email'
          }
        });

        expect(response.statusCode).toBe(400);
        expect(response.json()).toMatchObject({
          error: {
            code: 'BAD_REQUEST',
            message: 'email must match format "email"'
          }
        });
      });
    });

    describe('when user is under 18', () => {
      it('returns bad request and error object', async () => {
        const response = await fastify.inject({
          method: 'POST',
          url: '/users',
          payload: {
            ...makeValidUser(),
            birthDate: new Date().toISOString()
          }
        });

        expect(response.statusCode).toBe(400);
        expect(response.json()).toMatchObject({
          error: {
            code: 'BAD_REQUEST',
            message: 'User must be at least 18 years old'
          }
        });
      });
    });

    describe('when username is too short', () =>{
      describe('username', () => {
        it('returns bad request and error object', async () => {
          const response = await fastify.inject({
            method: 'POST',
            url: '/users',
            payload: {
              ...makeValidUser(),
              username: 'ba'
            }
          });

          expect(response.statusCode).toBe(400);
          expect(response.json()).toMatchObject({
            error: {
              code: 'BAD_REQUEST',
              message: 'username must NOT have fewer than 3 characters'
            }
          });
        });
      })
    } )

    describe('lacking parameters', () => {
      describe('username', () => {
        it('returns bad request and error object', async () => {
          const response = await fastify.inject({
            method: 'POST',
            url: '/users',
            payload: {
              email: 'foo@provider.com',
              birthDate: new Date('1990-01-01').toISOString()
            }
          });

          expect(response.statusCode).toBe(400);
          expect(response.json()).toMatchObject({
            error: {
              code: 'BAD_REQUEST',
              message: "body must have required property 'username'"
            }
          });
        });
      });

      describe('email', () => {
        it('returns bad request and error object', async () => {
          const response = await fastify.inject({
            method: 'POST',
            url: '/users',
            payload: {
              username: 'foo',
              birthDate: new Date('1990-01-01').toISOString()
            }
          });

          expect(response.statusCode).toBe(400);
          expect(response.json()).toMatchObject({
            error: {
              code: 'BAD_REQUEST',
              message: "body must have required property 'email'"
            }
          });
        });
      });

      describe('birthDate', () => {
        it('returns bad request and error object', async () => {
          const response = await fastify.inject({
            method: 'POST',
            url: '/users',
            payload: {
              username: 'foo',
              email: 'foo@provider.com',
            }
          });
          
          expect(response.statusCode).toBe(400);
          expect(response.json()).toMatchObject({
            error: {
              code: 'BAD_REQUEST',
              message: "body must have required property 'birthDate'"
            }
          });
        });
      });
    });
  });
});
