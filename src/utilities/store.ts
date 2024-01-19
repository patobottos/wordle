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
  gameState: 'playing' | 'won' | 'lost';
  addGuess: (guess: string) => void;
  newGame(initialGuess?: string[]): void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => {

      const addGuess = (guess: string) => {
        const result = computeGuess(guess, get().answerWord);

        const didWin = result.every(i => i === LetterState.Match);

        const guessRows = [
          ...get().guessRows,
          {
            guess,
            result,
          }
        ];

        set({
          guessRows,
          gameState: didWin
            ? 'won'
            : guessRows.length === GUESS_CHANCES
              ? 'lost'
              : 'playing',
        })
      };

      return {
        answerWord: getRandomWordEng(),
        guessRows: [],
        gameState: 'playing',
        addGuess,

        newGame: (initialRows = []) => {
          set({
            answerWord: getRandomWordEng(),
            guessRows: [],
            gameState: 'playing',
          })
        }
      }
    },
    {
      name: "wordle",
    },
  )
);

// useStore.persist.clearStorage();