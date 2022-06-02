'use strict';

// The 'async' converts the function in a return promise based function
// That means that the implicit return is a Promise<any>
const plainAsyncFunction = async () => {
  console.log('start');
  return 'done';
};

(async () => {
  // The function stops util promise is resolved
  const val = await plainAsyncFunction();
  console.log('Value =>', val);
})();
