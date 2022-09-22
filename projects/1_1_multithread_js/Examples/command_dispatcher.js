const commands = {
  square_sum(max) {
    let sum = 0;
    for (let i = 0; i < max; i++) sum += Math.sqrt(i);
    return sum;
  },
  fibonacci(limit) {
    let prev = 1n,
      next = 0n,
      swap;
    while (limit) {
      swap = prev;
      prev = prev + next;
      next = swap;
      limit--;
    }
    return String(next);
  },
};
function dispatch(method, args) {
  if (commands.hasOwnProperty(method)) {
    return commands[method](...args);
  }
  throw new TypeError(`Command ${method} not defined!`);
}
