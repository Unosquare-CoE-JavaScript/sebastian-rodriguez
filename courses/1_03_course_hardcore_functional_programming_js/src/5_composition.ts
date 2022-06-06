'use strict';

import { compose } from 'ramda';

export const toUpper = (str: string) => str.toUpperCase();

export const exclaim = (str:string) => str + '!';

export const first = (xs: string) => xs[0];

const manualCompose =
  (fn1: any, fn2: any) =>
  (...args: any) =>
    fn1(fn2(...args));

const shout = manualCompose(exclaim, toUpper);
const firstShout = manualCompose(first, shout);

console.log(shout('tears'));
console.log(firstShout('tears'));

const composedShout = compose(exclaim, toUpper, first);

console.log(composedShout('tears'));
