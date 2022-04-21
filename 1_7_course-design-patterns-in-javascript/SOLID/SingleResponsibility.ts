import * as fs from 'fs';
import { join } from 'path';

interface IJournalEntry {
  [key: string | number]: string;
}

class Journal {
  constructor(public entries: IJournalEntry = {}, private count = 0) {}

  addEntry(text: string) {
    const c = ++this.count;
    const entry = `${c}: ${text}`;
    this.entries[c] = entry;
  }

  removeEntry(index: number) {
    delete this.entries[index];
  }

  getEntry(index: number) {
    return this.entries[index];
  }

  toString() {
    return Object.values(this.entries).join('\n');
  }

  // Add functionalities not related to the single responsibility principle
  // save(filename: string) {
  //   fs.writeFileSync(filename, this.toString());
  // }

  // load(filename: string) {
  //   const text = fs.readFileSync(filename, 'utf8');
  //   const entries = text.split('\n');
  //   entries.forEach((entry) => this.addEntry(entry));
  // }

  // loadFromUrl(url: string) {
  //   // ...
  // }
  // Should move to a separate class
}

class PersistanceManager {
  static save(journal: Journal, filename: string) {
    fs.writeFileSync(filename, journal.toString());
  }

  preprocess(journal: Journal) {
    // ...
  }
}

export { Journal, PersistanceManager };
