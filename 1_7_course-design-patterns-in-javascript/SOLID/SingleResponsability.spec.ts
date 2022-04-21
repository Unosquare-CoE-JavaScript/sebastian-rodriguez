import { describe, it, expect, beforeEach } from 'vitest';
import { Journal } from './SingleResponsibility';

describe('Single responsibility', () => {
  describe('Journal', () => {
    let journal: Journal;

    beforeEach(() => {
      journal = new Journal();
      console.log('beforeEach', journal.toString(), 'end');
      journal.addEntry('I cried today.');
      journal.addEntry('I ate a bug.');
    });

    it('should be able to add entries', () => {
      expect(journal.toString()).toEqual('1: I cried today.\n2: I ate a bug.');
    });

    it('should be able to remove entries', () => {
      journal.removeEntry(1);
      expect(journal.toString()).toEqual('2: I ate a bug.');
    });
  });
});
