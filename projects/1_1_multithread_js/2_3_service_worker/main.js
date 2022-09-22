console.log('Hello, service worker');

navigator.serviceWorker.register('/sw.js', {
  scope: '/',
  type: "module",
});

navigator.serviceWorker.oncontrollerchange = () => {
  console.log('controller change');
};

async function makeRequest() {
  const result = await fetch('/data.json');
  const payload = await result.json();
  console.log(payload);
}
