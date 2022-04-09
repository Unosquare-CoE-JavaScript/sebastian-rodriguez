import fastify from 'fastify';
import { PORT } from './const/env';
import router from './router';
import doHash from './utils/pbkdf2.util';

// let server: FastifyInstance;

const app = () => {
  // SERVER
  // ===================================================================

  // Create just one or create multiple servers (?)
  // if (!server) {
  //   server = fastify({
  //     logger: true,
  //   });
  //   server.log.info(
  //     `Server created at ${cluster.isPrimary ? 'primary' : 'secondary'}`
  //   );
  // }

  const server = fastify({
    logger: true,
  });
  // server.log.info(
  //   `Server created at ${cluster.isPrimary ? 'primary' : 'secondary'}`
  // );

  // ROUTES
  // ===================================================================
  router(server);
  server.get('/ping', async (request, reply) => {
    request.log.info('ping');
    doHash(() => {
      reply.send({ ping: 'pong' });
    });
  });

  // APP
  // ===================================================================
  return async () => {
    try {
      await server.listen({ port: Number(PORT) });
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  };
};

export default app;
