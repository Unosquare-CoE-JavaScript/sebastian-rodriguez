export function myAsyncFunction(callback) {
  setTimeout(() => {
    callback('blah');
  }, 50);
}

// in-source test suite
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it('test_async_callbacks', (done) => {
    myAsyncFunction((result) => {
      expect(result).to.equal('blah');
      done();
    });
  });
}
