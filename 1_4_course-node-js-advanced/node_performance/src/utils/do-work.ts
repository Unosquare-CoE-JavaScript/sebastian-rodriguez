const doWork = (duration: number) => {
  const start = Date.now();
  while (Date.now() - start < duration) {
    // do nothing
  }
};

export default doWork;
