'use strict';

const http = require('http');

const start = Date.now();

// The http request are done by the OS,
// so the OS decides how many threads use or cores
const doRequest = () =>
  http
    .request('http://www.google.com', (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log(Date.now() - start);
      });
    })
    .end();

doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
