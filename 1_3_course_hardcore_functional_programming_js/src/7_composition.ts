// Functional Way - Course

// const doStuff = compose(
//   join(''),
//   filter((x: any) => x.length > 3),
//   reverse,
//   map(trim),
//   split(' '),
//   toLower,
// );

// Declarative Way
const doStuff2 = (str: string) => {
  const lower = str.toLowerCase();
  const words = lower.split(' ');

  words.reverse();

  for (const i in words) {
    if (Object.prototype.hasOwnProperty.call(words, i)) {
      words[i] = words[i].trim();
    }
  }

  let keepers = [];

  for (const i in words) {
    if (Object.prototype.hasOwnProperty.call(words, i)) {
      if (words[i].length > 3) {
        keepers.push(words[i]);
      }
    }
  }

  return keepers.join(' ');
}

// Fully Javascript Functional Way
// Composition can ve done by chaining functions together with the dot notation
const doStuff3 = (str: string) => str.toLowerCase().split(' ').map((word: string) => word.trim()).reverse().filter((word: string) => word.length > 3).join(' ');

if (import.meta.vitest) {
  const { it, expect, describe } = import.meta.vitest;

  describe('doStuff', () => {
    it('should convert a sentence in minus and return only if word is greatter than 2', () => {
      expect(doStuff2('Hello World')).toBe('world hello');
      expect(doStuff3('Hello my people')).toBe('people hello');
    });
  });
}

