import { Worker, isMainThread, parentPort } from 'worker_threads';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const THREAD_COUNT = 4;
const big64arr = new BigUint64Array(1);

const random64 = () => {
  crypto.randomFillSync(big64arr);
  return big64arr[0];
}

const sumDigitsSquared = num => {
  let total = 0n;
  while (num > 0) {
    const numModBase = num % 10n;
    total += numModBase ** 2n;
    num = num / 10n;
  }
  return total;
};

const isHappy = num => {
  while (num != 1n && num != 4n) {
    num = sumDigitsSquared(num);
  }
  return num === 1n;
};

const isHappycoin = num => isHappy(num) && num % 10000n === 0n;

if (isMainThread) {
  const inFlight = THREAD_COUNT;
  let count = 0;
  for (let i = 0; i < THREAD_COUNT; i++) {
    const worker = new Worker(__filename);
    worker.on('message', (msg) => {
      if (msg === 'done') {
        if (--inFlight === 0) {
          process.stdout.write('\ncount ' + count + '\n');
        }
      } else if (typeof msg === 'bigint') {
        process.stdout.write(msg.toString() + ' ');
        count++;
      }
    });
  }
} else {
  for (let i = 1; i < 10_000_000 / THREAD_COUNT; i++) {
    const randomNum = random64();
    if (isHappycoin(randomNum)) {
      parentPort.postMessage(randomNum);
    }
  }
  parentPort.postMessage('done');
}