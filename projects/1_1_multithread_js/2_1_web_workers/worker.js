console.log('=> Hello from workers');

self.onmessage = msg => {
  console.log('msg from main = ', msg.data);

  postMessage('msg sent from worker')
}

console.log('=> Bye from workers');