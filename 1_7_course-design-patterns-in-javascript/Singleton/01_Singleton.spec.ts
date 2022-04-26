import { describe, it, expect } from 'vitest';
import { Singleton } from './01_Singleton';

describe('Singleton', () => {
  it('should be the same', () => {
    const singleton1 = Singleton.getInstance();
    const singleton2 = Singleton.getInstance();
    expect(singleton1).toBe(singleton2);
  });
});
