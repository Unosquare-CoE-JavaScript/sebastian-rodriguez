import { FastifyInstance, FastifyRequest } from 'fastify';

const fastIndex = async (request: FastifyRequest) => {
  request.log.info('fast');
  return { fast: 'fast' };
};

const fastRouter = (server: FastifyInstance, opts: unknown, done: any) => {
  server.get('/', fastIndex);
  done();
};

export default fastRouter;
