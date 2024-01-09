import { describe, expect, test } from 'vitest';
import { computeGuess, isValidGuess, LetterState, getRandomWordEng } from './word-utils';
import { render, screen } from "./test/test-utils";

describe("getRandomWord", () => {
  test("random word", () => {
    expect(getRandomWordEng()).toBeTruthy();
    expect(getRandomWordEng().length).toEqual(5);
  });
});

describe("computeGuess", () => {
  test("works with Match, Present and Miss", () => {
    expect(computeGuess('cally', 'close')).toEqual([
      LetterState.Match,
      LetterState.Miss,
      LetterState.Present,
      LetterState.Present,
      LetterState.Miss,
    ]);
  });

  test("works with exact Match", () => {
    expect(computeGuess('close', 'close')).toEqual([
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
    ]);
  });

  test("works with all Miss", () => {
    expect(computeGuess('trump', 'close')).toEqual([
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });

  test('only does one match when two letters exist', () => {
    expect(computeGuess('solid', 'boost')).toEqual([
      LetterState.Present,
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });

});