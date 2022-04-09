import fastify from 'fastify'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000;

const server = fastify({
  logger: true
});

server.get('/ping', async (request, reply) => {
  request.log.info('ping');
  return { pong: 'pong' }
});

(async () => {
  try {
    await server.listen({port: Number(PORT)})
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();