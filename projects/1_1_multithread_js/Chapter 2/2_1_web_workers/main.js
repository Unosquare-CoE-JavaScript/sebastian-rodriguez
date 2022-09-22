console.log('Hello, Web Workers')

const worker = new Worker('worker.js')

worker.onmessage = msg =>
  console.log('message received from worker =', msg.data);

worker.postMessage('message sent to worker')

console.log('Bye, Web Workers');