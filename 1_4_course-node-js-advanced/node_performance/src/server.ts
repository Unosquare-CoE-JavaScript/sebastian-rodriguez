import cluster from 'cluster';
import fastify from 'fastify';
import { PORT } from './const/env';
import router from './router';
import doWork from './utils/do-work';

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
  server.log.info(
    `Server created at ${cluster.isPrimary ? 'primary' : 'secondary'}`
  );

  // ROUTES
  // ===================================================================
  router(server);
  server.get('/ping', async request => {
    request.log.info('ping');
    doWork(5000);
    return { pong: 'pong' };
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
