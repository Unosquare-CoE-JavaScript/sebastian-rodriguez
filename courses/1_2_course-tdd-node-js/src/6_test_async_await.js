export const asyncFunc = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('blah');
    }, 50);
  });
};

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it('test_async', async () => {
    const result = await asyncFunc();
    expect(result).to.equal('blah');
  });
}
