// process.env.UV_THREADPOOL_SIZE = '1';
// IMPORTS
// ===================================================================
// import cluster from 'cluster';

import dotenv from 'dotenv';
import app from './server';

// CONFIG
// ===================================================================
dotenv.config();
const server = app();

server();

// Clustering mode
// if (cluster.isPrimary) {
//   cluster.fork();
//   cluster.fork();
//   cluster.fork();
//   cluster.fork();
// } else {
//   server();
// }
