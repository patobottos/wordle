import wordBankEng from "../data/word-bank-EN.json"

const word: string = getRandomWordEng();
console.log('Word en WordUtils', word);

export enum LetterState {
  Miss, // Letter doesn't exist at all - GRAY
  Present, // Letter exists but wrong location - YELLOW
  Match, // Letter exists and is in the right location - GREEN
}

export const characterStateStyles = {
  [LetterState.Miss]: 'border-gray-400 bg-gray-400',
  [LetterState.Present]: 'border-yellow-400 bg-yellow-400',
  [LetterState.Match]: 'border-green-600 bg-green-600',
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

// FUNCTION TO AVALUATE EACH LETTER OF THE GUESS. IT RETURNS AN ARRAY OF STATES FOR EACH LETTER
export function computeGuess(
  guessingWord: string,
  answerWord: string = word
): LetterState[] {

  const results: LetterState[] = [];
  const guessAsArray: string[] = guessingWord.split("");
  const answerAsArray: string[] = answerWord.split("");
  const answerLetterCount: Record<string, number> = {};

  // IT RETURNS AN EMPTY ARRAY OF STATES WHEN WORDS HAVE DIFFERENT LENGTH
  if (guessingWord.length !== answerWord.length) {
    return results;
  }

  // IT COUNTS THE OCCURRENCES OF EACH LETTER IN THE ANSWER WORD
  answerAsArray.forEach(letter => {
    answerLetterCount[letter] = (answerLetterCount[letter] || 0) + 1;
  });

  // FUNCTION TO CHECK THE LETTER EXISTS, AND IT'S IN THE RIGHT LOCATION (GREEN COLOR)
  function isMatch(guess: string, _answer: string, guessIndex: number): boolean {
    return answerLetterCount[guess] > 0 && guessIndex === answerAsArray.indexOf(guess);
  }

  // FUNCTION TO CHECK THE LETTER EXISTS, BUT IS NOT IN THE RIGHT POSITION (YELLOW COLOR)
  function isPresent(guess: string, _answer: string, guessIndex: number): boolean {
    return answerLetterCount[guess] > 0 && guessIndex !== answerAsArray.indexOf(guess);
  }

  for (let i = 0; i < answerAsArray.length; i++) {
    if (isMatch(guessAsArray[i], answerAsArray[i], i)) {
      results.push(LetterState.Match);
      // Decrement the count to handle repeated letters
      answerLetterCount[guessAsArray[i]]--;
    } else if (isPresent(guessAsArray[i], answerAsArray[i], i)) {
      results.push(LetterState.Present);
      // Decrement the count to handle repeated letters
      answerLetterCount[guessAsArray[i]]--;
    } else {
      results.push(LetterState.Miss);
    }
  }


  return results;

}