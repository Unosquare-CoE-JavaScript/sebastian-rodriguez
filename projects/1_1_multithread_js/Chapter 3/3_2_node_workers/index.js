const { Worker, isMainThread, workerData } = require('worker_threads');
const assert = require('assert');

// Passing data to a worker thread via workerData
if (isMainThread) {
  const worker = new Worker(__filename, { workerData: { num: 42 } });
} else {
  assert.strictEqual(workerData.num, 42);
}

// Bidirectional communication via the default MessagePorts
if (isMainThread) {
  const worker = new Worker(__filename);
  worker.on('message', (msg) => {
    worker.postMessage(msg);
  });
} else {
  parentPort.on('message', (msg) => {
    console.log('We got a message from the main thread:', msg);
  });
  parentPort.postMessage('Hello, World!');
}

// Bidirectional communication via MessagePort created with MessageChannel
if (isMainThread) {
  const { port1, port2 } = new MessageChannel();
  const worker = new Worker(__filename, {
    workerData: {
      port: port2,
    },
    transferList: [port2],
  });
  port1.on('message', (msg) => {
    port1.postMessage(msg);
  });
} else {
  const { port } = workerData;
  port.on('message', (msg) => {
    console.log('We got a message from the main thread:', msg);
  });
  port.postMessage('Hello, World!');
}