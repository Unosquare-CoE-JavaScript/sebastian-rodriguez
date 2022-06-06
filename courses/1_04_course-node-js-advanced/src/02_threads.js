'use strict';

process.env.UV_THREADPOOL_SIZE = 6;
const crypto = require('crypto');

// Timers
// =============================================================
console.time('pbkdf2');
console.time('pbkdf2 - 2');
console.time('pbkdf2 - 3');
console.time('pbkdf2 - 4');
console.time('pbkdf2 - 5');
console.time('pbkdf2 - 6');

// Measurement 1
// =============================================================
crypto.pbkdf2('a', 'b', 100_000, 512, 'sha512', () => {
  console.timeEnd('pbkdf2');
});

// Measurement 2
// =============================================================
crypto.pbkdf2('a', 'b', 100_000, 512, 'sha512', () => {
  console.timeEnd('pbkdf2 - 2');
});

// Measurement 3
// =============================================================
crypto.pbkdf2('a', 'b', 100_000, 512, 'sha512', () => {
  console.timeEnd('pbkdf2 - 3');
});

// Measurement 4
// =============================================================
crypto.pbkdf2('a', 'b', 100_000, 512, 'sha512', () => {
  console.timeEnd('pbkdf2 - 4');
});

// Measurement 5
// =============================================================
crypto.pbkdf2('a', 'b', 100_000, 512, 'sha512', () => {
  console.timeEnd('pbkdf2 - 5');
});

// Measurement 6
// =============================================================
crypto.pbkdf2('a', 'b', 100_000, 512, 'sha512', () => {
  console.timeEnd('pbkdf2 - 6');
});
