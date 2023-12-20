import wordBankEng from "../data/word-bank-EN.json"


const word: string = getRandomWordEng();
console.log('Word en WordUtils', word);


export enum LetterState {
  Miss, // Letter doesn't exist at all
  Present, // Letter exists but wrong location
  ManyPresent, // Letter exists, and many times, but wrong location 
  Match, // Letter exists and is in the right location
  AnotherMatch, // Letter exists, in right location, and there's another one in another location
}

export const characterStateStyles = {
  [LetterState.Miss]: 'border-gray-400 bg-gray-400',
  [LetterState.Present]: 'border-yellow-400 bg-yellow-400',
  [LetterState.ManyPresent]: 'border-sky-500 bg-sky-500',
  [LetterState.Match]: 'border-green-600 bg-green-600',
  [LetterState.AnotherMatch]: 'border-pink-400 bg-pink-400',
};

// FUNCTION TO FIND A RANDOM WORD OUT OF THE WORD BANK
export function getRandomWordEng(): string {
  const randomIndex = Math.floor(Math.random() * wordBankEng.length);
  return wordBankEng[randomIndex];
}

// FUNCTION TO CHECK IF THE GUESS IS A VALID WORD
export function isValidGuess(word: string): boolean {
  return wordBankEng.includes(word);
}

// FUNCTION TO FIND DUPLICATE LETTERS IN THE ANSWER WORD
export function findDuplicateLetters(array: string[]) {
  const duplicateLetters: string[] = [];
  const frequencyMap: Record<string, boolean> = {};

  for (let i = 0; i < array.length; i++) {
    const element: string = array[i];

    if (frequencyMap[element]) {
      if (!duplicateLetters.includes(element)) {
        duplicateLetters.push(element);
      }
    } else {
      frequencyMap[element] = true;
    }
  }

  return duplicateLetters;
}

// FUNCTION TO AVALUATE EACH LETTER OF THE GUESS. IT RETURNS AN ARRAY OF STATES FOR EACH LETTER
export function computeGuess(
  guessingWord: string,
  answerWord: string = word
): LetterState[] {

  const results: LetterState[] = [];
  const guessArray: string[] = guessingWord.split("");
  const answerArray: string[] = answerWord.split("");
  const duplicatedLettersArray: string[] = findDuplicateLetters(answerArray);

  //FUNCTIONS TO FIND DIFFERENT STATES OF THE GUESSING LETTER

  /// FUNCTION TO CHECK THE LETTER EXISTS, IS IN THE RIGHT LOCATION, AND THERE'S ANOTHER ONE IN SOME OTHER LOCATION - (ORANGE COLOR)
  function isAnotherMatch(duplicatedLettersArray: string[], guess: string, _answer: string, guessIndex: number): boolean {
    return answerArray.includes(guess) && guessIndex === answerArray.indexOf(guess) && duplicatedLettersArray.includes(guess);
  }

  /// FUNCTION TO CHECK THE LETTER EXISTS, IS IN THRE RIGHT LOCATION, AND THERE ARE NO OTHER LETTERS REPEATED - (GREEN COLOR)
  function isMatch(duplicatedLettersArray: string[], guess: string, _answer: string, guessIndex: number): boolean {
    return answerArray.includes(guess) && guessIndex === answerArray.indexOf(guess) && !duplicatedLettersArray.includes(guess);
  }

  /// FUNCTION TO CHECK LETTER EXISTS, BUT IS NOT IN THE RIGHT POSITION, AND THERE ARE NO OTHER REPEATED LETTERS LIKE THIS ONE (YELLOW COLOR)
  function isPresent(duplicatedLettersArray: string[], guess: string, _answer: string, guessIndex: number): boolean {
    return answerArray.includes(guess) && guessIndex !== answerArray.indexOf(guess) && !duplicatedLettersArray.includes(guess);
  }

  /// FUNCTION TO CHECK LETTER EXISTS, BUT IT IS NOT IN THE RIGHT LOCATION, AND THERE ARE MORE THAN ONE IN THE ANSWER WORD (BLUE COLOR)
  function isManyPresent(duplicatedLettersArray: string[], guess: string, _answer: string, guessIndex: number): boolean {
    return answerArray.includes(guess) && guessIndex !== answerArray.indexOf(guess) && duplicatedLettersArray.includes(guess);
  }

  for (let i = 0; i < answerArray.length; i++) {
    if (isAnotherMatch(duplicatedLettersArray, guessArray[i], answerArray[i], guessArray.indexOf(guessArray[i]))) {
      results.push(LetterState.AnotherMatch);
    } else if (isMatch(duplicatedLettersArray, guessArray[i], answerArray[i], guessArray.indexOf(guessArray[i]))) {
      results.push(LetterState.Match);
    } else if (isPresent(duplicatedLettersArray, guessArray[i], answerArray[i], guessArray.indexOf(guessArray[i]))) {
      results.push(LetterState.Present);
    } else if (isManyPresent(duplicatedLettersArray, guessArray[i], answerArray[i], guessArray.indexOf(guessArray[i]))) {
      results.push(LetterState.ManyPresent);
    } else {
      results.push(LetterState.Miss);
    }
  }

  return results;
}




