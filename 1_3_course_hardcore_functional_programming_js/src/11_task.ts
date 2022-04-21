import { Task } from './types';

const task = Task((reject, resolve) => resolve(2))
  .map((two) => two + 1)
  .map((three) => three * 2);

if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest;

  it('should return the task value', () => {
    const result = task.fork(
      (error) => error,
      (value) => value
    );
    expect(result).toEqual(6);
  });
}
