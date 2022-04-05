'use strict';

import { curry, filter, map, reduce, test } from 'ramda';

const split = curry((delimiter, string) => string.split(delimiter));

// ====================================================================================
// Exercises
// ====================================================================================

// Exercise 1
// ============================

const words = (str) => split(' ', str);
const curryWords = split(' ');

// Exercise 2
// ============================
// Use map to make a new words fn that not only works on 1 string, but on an array of strings.

const sentences = (xs) => map(words, xs);
const sentencesC = (xs) => map(curryWords, xs);
const currySentences = map(curryWords);

// Exercise 3
// ============================

const filterQs = (xs) => filter((x) => test(/q/gi, x), xs);
const curryFilterQs = filter(test(/q/gi));

// Exercise 4
// ============================
// Une the helper function _keepHighest to refactor max.

const _keepHighest = (x, y) => (x >= y ? x : y);

const max = (xs) => reduce((acc, x) => _keepHighest(acc, x), 0, xs);
const curryMax = reduce(_keepHighest, 0);

// Bonus 1
// ============================
// wrap array's build in slice to be functional and curried like ramda fn's
// //[1,2,3].slice(0,2) // [1,2]

const slice = curry((start, end, xs) => xs.slice(start, end));

// Bonus 2
// ============================
// use slice to define a function take() that takes n elements from an array. Make it curried.

const take = slice(0);

// ====================================================================================
// Test Exercises
// ====================================================================================

if (import.meta.vitest) {
  const { it, expect, describe } = import.meta.vitest;

  describe('Exercise 1', () => {
    it('should split a string into an array of words', () => {
      expect(words('Hello World')).toEqual(['Hello', 'World']);
      expect(curryWords('Hello World')).toEqual(['Hello', 'World']);
    });
    it('should split strict string into an array of words', () => {
      expect(words('Jingle bells Batman smells')).toStrictEqual([
        'Jingle',
        'bells',
        'Batman',
        'smells',
      ]);
      expect(curryWords('Jingle bells Batman smells')).toStrictEqual([
        'Jingle',
        'bells',
        'Batman',
        'smells',
      ]);
    });
  });

  describe('Exercise 2', () => {
    it('should convert two sentences in two arrays of words', () => {
      expect(sentences(['Hello World', 'How are you?'])).toEqual([
        ['Hello', 'World'],
        ['How', 'are', 'you?'],
      ]);
      expect(sentencesC(['Hello World', 'How are you?'])).toEqual([
        ['Hello', 'World'],
        ['How', 'are', 'you?'],
      ]);
      expect(currySentences(['Hello World', 'How are you?'])).toEqual([
        ['Hello', 'World'],
        ['How', 'are', 'you?'],
      ]);
    });
  });

  describe('Exercise 3', () => {
    it('should filter out words that contain a "q"', () => {
      expect(filterQs(['quick', 'camels', 'quarry', 'over', 'quails'])).toEqual(
        ['quick', 'quarry', 'quails']
      );
      expect(
        curryFilterQs(['quick', 'camels', 'quarry', 'over', 'quails'])
      ).toEqual(['quick', 'quarry', 'quails']);
    });
  });

  describe('Exercise 4', () => {
    it('should find the highest number in an array', () => {
      expect(max([1, 3, 5, 2, 90, 20])).toBe(90);
    });
    it('should find the highest number in an array with curry function', () => {
      expect(curryMax([1, 3, 5, 2, 90, 20])).toBe(90);
    });
  });

  describe('Bonus 1', () => {
    it('should slice an array', () => {
      expect(slice(1)(3)([1, 2, 3])).toEqual([2, 3]);
    });
  });

  describe('Bonus 2', () => {
    it('should take n elements from an array', () => {
      expect(take(2)([1, 2, 3, 4, 5])).toEqual([1, 2]);
    });
  });
}
