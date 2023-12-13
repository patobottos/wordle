import wordBankEng from "../data/word-bank-EN.json"

export function getRandomWordEng() {
  const randomIndex = Math.floor(Math.random() * wordBankEng.length);
  return wordBankEng[randomIndex];
}


// CODE FOLLOWING 
export enum LetterState {
  Miss, // Letter doesn't exist at all
  Present, // Letter exists but wrong location
  Match, // Letter exists and is in the right location
}

export const characterStateStyles = {
  [LetterState.Miss]: 'border-gray-500 bg-gray-500',
  [LetterState.Present]: 'border-yellow-500 bg-yellow-500',
  [LetterState.Match]: 'border-green-500 bg-green-500',
};


// SOME CODE IN CASE IS NECESSARY
/* export const LetterPossibleStatesAndStyles = [
  {
    state: "Miss",
    style: "border-gray-500 bg-gray-500",
  },
  {
    state: "Present",
    style: "border-yellow-500 bg-yellow-500",
  },
  {
    state: "Match",
    style: "border-gray-500 bg-green-500",
  }
] */