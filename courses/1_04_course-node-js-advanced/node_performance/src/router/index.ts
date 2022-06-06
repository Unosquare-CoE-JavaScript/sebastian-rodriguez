import { FastifyInstance } from 'fastify';
import fastRouter from './fast.route';

const router = (server: FastifyInstance) => {
  server.register(fastRouter, { prefix: '/fast' });
};

export default router;
