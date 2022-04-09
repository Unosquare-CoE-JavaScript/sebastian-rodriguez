// IMPORTS
// ===================================================================
import cluster from 'cluster';

import dotenv from 'dotenv';
import app from './server';

// CONFIG
// ===================================================================
dotenv.config();
const server = app();

if (cluster.isPrimary) {
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  server();
}
