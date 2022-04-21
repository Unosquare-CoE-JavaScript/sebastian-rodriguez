export const promiseFunc = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('blah');
    }, 50);
  });
};

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it('test_async_promise', () => {
    promiseFunc().then((result) => {
      expect(result).to.equal('blah');
    });
  });
}
