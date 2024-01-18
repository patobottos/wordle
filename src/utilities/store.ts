import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { computeGuess, getRandomWordEng, LetterState } from './word-utils';

export const WORD_LENGTH = 5;
export const GUESS_CHANCES = 6;

interface GuessRow {
  guess: string;
  result?: LetterState[];
}

interface StoreState {
  answerWord: string;
  guessRows: GuessRow[];
  addGuess: (guess: string) => void;
  newGame(initialGuess?: string[]): void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      answerWord: getRandomWordEng(),
      guessRows: [],
      addGuess: (guess: string) => {
        set(state => ({
          guessRows: [
            ...state.guessRows,
            {
              guess,
              result: computeGuess(guess, state.answerWord)
            }]
        }))
      },
      newGame: () => {
        set({
          answerWord: getRandomWordEng(),
          guessRows: [],
        })
      }
    }),
    {
      name: "wordle",
    },
  )
);

// useStore.persist.clearStorage();