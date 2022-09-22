import { Piscina } from 'piscina';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const THREAD_COUNT = 4;
const __filename = fileURLToPath(import.meta.url);
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


if (!Piscina.isWorkerThread) {
  const piscina = new Piscina({
    filename: __filename,
    minThreads: THREAD_COUNT,
    maxThreads: THREAD_COUNT,
  });
  let done = 0;
  let count = 0;
  for (let i = 0; i < THREAD_COUNT; i++) {
    (async () => {
      const { total, happycoins } = await piscina.run();
      process.stdout.write(happycoins);
      count += total;
      if (++done === THREAD_COUNT) {
        console.log('\ncount', count);
      }
    })();
  }
}

const run = () => {
  let happycoins = '';
  let total = 0;
  for (let i = 0; i < 10_000_000 / THREAD_COUNT; i++) {
    const randomNum = random64();
    if (isHappycoin(randomNum)) {
      happycoins += randomNum.toString() + ' ';
      total++;
    }
  }
  return { total, happycoins };
};

const { total, happycoins } = run();

console.log('total =>', total);
console.log('happycoins =>', happycoins);