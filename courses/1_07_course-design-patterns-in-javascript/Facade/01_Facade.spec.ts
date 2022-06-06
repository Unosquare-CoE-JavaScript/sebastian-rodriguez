import { describe, expect, it } from 'vitest';
import { Console } from './01_Facade';

describe.skip('Facade', () => {
  it('should get the first letter in the Console', () => {
    const consola = new Console();
    consola.write('hello');
    expect(consola.getCharAt(0)).toBe('h');
  });
});
