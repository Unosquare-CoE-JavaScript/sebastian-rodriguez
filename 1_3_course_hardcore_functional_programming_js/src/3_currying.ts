'use strict';

import { curry } from 'ramda';

const replace = curry((regex, replacement, str) =>
  str.replace(regex, replacement)
);

const replaceVowels = replace(/[aeiou]/gi, '*');

const result = replaceVowels('Hello World');

console.log('replaceVowels =>', result);
