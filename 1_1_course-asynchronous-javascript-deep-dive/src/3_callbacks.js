'use strict';

const logCall = () => console.log('logCall was called back.');

// The funcion logCall declared passed as a callback
setTimeout(logCall, 3000);

// The first parameter is a callback.
// Callbacks can be named or anonymus functions
setTimeout(() => console.log('The lambda was called back.'), 1000);
