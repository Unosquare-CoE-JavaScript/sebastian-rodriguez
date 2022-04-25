'use strict';

const http = require('http');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();

// The http request are done by the OS,
// so the OS decides how many threads use or cores
const doRequest = () =>
  http
    .request('http://www.google.com', (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log('REQUEST: ', Date.now() - start);
      });
    })
    .end();

const doHash = () =>
  crypto.pbkdf2('a', 'b', 100_000, 512, 'sha512', () => {
    console.log('Hash: ', Date.now() - start);
  });

doRequest();

fs.readFile('multitask.js', 'utf8', () => {
  console.log('FS: ', Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();
