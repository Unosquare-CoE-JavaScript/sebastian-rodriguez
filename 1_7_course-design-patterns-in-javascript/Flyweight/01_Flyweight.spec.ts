import { describe, expect, it } from 'vitest';
import { BetterFormattedText, FormattedText } from './01_Flyweight';

describe('Flyweight', () => {
  const text = 'This is a brave new world';
  it('should format text', () => {
    let ft = new FormattedText(text);
    ft.capitalize(10, 15);
    expect(ft.toString()).toEqual('This is a BRAVE new world');
  });
  it('should better format text', () => {
    let bft = new BetterFormattedText(text);
    bft.getRange(16, 19).capitalize = true;
    expect(bft.toString()).toEqual('This is a brave NEW world');
  });
});
