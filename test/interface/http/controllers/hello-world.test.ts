import { fastify } from '../../../../src/interface/http/server.ts';

describe('Hello World Controller', () => {
  describe('GET /', () => {
    it('returns { hello: "world" }', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/hello-world'
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toEqual({ hello: 'world' });
    });
  });
});
