import crypto from 'crypto';

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

let count = 0;
for (let i = 1; i < 10_000_000; i++) {
  const randomNum = random64();
  if (isHappycoin(randomNum)) {
    process.stdout.write(randomNum.toString() + ' ');
    count++;
  }
}