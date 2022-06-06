import { parentPort } from 'worker_threads';

parentPort?.on('message', message => `Hello, ${message}`);

parentPort?.postMessage('pong');
