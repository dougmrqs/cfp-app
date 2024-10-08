import { fastify } from '../../../../src/interface/http/server';
import { prisma } from '../../../../src/connection';

describe('UsersController', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany({})  
  });

  describe('POST /users', () => {
    it('creates a user', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'foo',
          email: 'foo@provider.com',
          birthDate: new Date('1990-01-01').toISOString()
        }
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
          data: {
            username: 'foo',
            email: 'foo@provider.com',
            birthDate: new Date().toISOString()
          }
        });
      });

      it('returns bad request and error object', async () => {
        const response = await fastify.inject({
          method: 'POST',
          url: '/users',
          payload: {
            username: 'bar',
            email: 'foo@provider.com',
            birthDate: new Date().toISOString()
          }
        });

        expect(response.statusCode).toBe(409);
        expect(response.json()).toMatchObject({
          error: {
            code: 'CONFLICT',
            message: 'Email already taken'
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
            username: 'foo',
            email: 'foo',
            birthDate: new Date().toISOString()
          }
        });

        expect(response.statusCode).toBe(400);
        expect(response.json()).toMatchObject({
          error: {
            code: 'BadRequest',
            message: 'email must be valid'
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
            username: 'foo',
            email: 'foo@provider.com',
            birthDate: new Date().toISOString()
          }
        });

        expect(response.statusCode).toBe(400);
        expect(response.json()).toMatchObject({
          error: {
            code: 'BadRequest',
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
              username: 'ba',
              email: 'foo@provider.com',
              birthDate: new Date('1990-01-01').toISOString()
            }
          });

          expect(response.statusCode).toBe(400);
          expect(response.json()).toMatchObject({
            error: {
              code: 'BadRequest',
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
              code: 'BadRequest',
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
              code: 'BadRequest',
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
              code: 'BadRequest',
              message: "body must have required property 'birthDate'"
            }
          });
        });
      });
    });
  });
});
