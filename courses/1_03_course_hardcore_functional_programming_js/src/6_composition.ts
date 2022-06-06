'use strict';

import { curry, compose } from 'ramda';
import { first, toUpper } from './5_composition';

const concat = curry((y, x) => x + y);

const loudFirst = compose(toUpper, first);
const shout = compose(concat('!'), loudFirst);

console.log(shout('tears'));
