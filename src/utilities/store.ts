import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { computeGuess, getRandomWordEng, LetterState } from './word-utils';

export const WORD_LENGTH = 5;
export const GUESS_CHANCES = 6;

interface StoreState {
  answerWord: string;
  guesses: string[];
  addGuess: (guess: string) => void;
  newGame(initialGuess?: string[]): void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      answerWord: getRandomWordEng(),
      guesses: ['close', 'local', 'claim'],
      addGuess: (guess: string) => {
        set(state => ({
          guesses: [...state.guesses, guess]
        }))
      },
      newGame: () => {
        set({
          answerWord: getRandomWordEng(),
          guesses: [],
        })
      }
    }),
    {
      name: "wordle",
    },
  )
);

// useStore.persist.clearStorage();