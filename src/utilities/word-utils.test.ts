import { describe, expect, test } from 'vitest';
import { computeGuess, isValidGuess, LetterState, getRandomWordEng } from './word-utils';

describe("getRandomWord", () => {
  test("it gives random word", () => {
    expect(getRandomWordEng()).toBeTruthy();
    expect(getRandomWordEng().length).toEqual(5);
  });
});

describe("isValidGuess", () => {
  test("it detects a valid word", async () => {
    expect(await isValidGuess("close")).toBe(true);
  });

  test("it detects and invalid word", async () => {
    expect(await isValidGuess("frdsa")).toBe(false);
  });
});

describe("computeGuess", () => {
  test('it returns empty array when given incomplete guess', () => {
    expect(computeGuess('sun', 'close')).toEqual([]);
  });

  test("it works with Match, Present and Miss", () => {
    expect(computeGuess('cally', 'close')).toEqual([
      LetterState.Match,
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });

  test("it works with exact Match", () => {
    expect(computeGuess('close', 'close')).toEqual([
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
    ]);
  });

  test("it works with all Miss", () => {
    expect(computeGuess('trump', 'close')).toEqual([
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });

  test('it only does 1 Present when 2 letters exist', () => {
    expect(computeGuess('solid', 'floor')).toEqual([
      LetterState.Miss,
      LetterState.Present,
      LetterState.Present,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });

  test('it works when 2 letters are present but answer has only 1 of those letters', () => {
    expect(computeGuess('allol', 'smelt')).toEqual([
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });

  test('it returns all match in a word when answerWord repeats 2 letters', () => {
    expect(computeGuess('floor', 'floor')).toEqual([
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
    ]);
  });

});