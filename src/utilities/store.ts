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
  keyboardLetterState: { [letter: string]: LetterState };
  addGuess: (guess: string) => void;
  newGame(initialGuess?: string[]): void;
  hint: boolean
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

        const keyboardLetterState = get().keyboardLetterState;
        result.forEach((r, index) => {
          const resultGuessLetter = guess[index];

          const currentLetterState = keyboardLetterState[resultGuessLetter];
          switch (currentLetterState) {
            case LetterState.Match:
              break;
            case LetterState.Present:
              if (r === LetterState.Miss) {
                break;
              }
              break;
            default:
              keyboardLetterState[resultGuessLetter] = r;
              break;
          }
        });

        set({
          guessRows,
          keyboardLetterState,
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
        keyboardLetterState: {},
        hint: false,
        addGuess,

        newGame: (initialRows = []) => {
          set({
            answerWord: getRandomWordEng(),
            guessRows: [],
            gameState: 'playing',
            keyboardLetterState: {}
          });
          initialRows.forEach(addGuess);

        },
      };
    },
    {
      name: "wordle",
      getStorage: () => localStorage,
    },
  )
);

// useStore.persist.clearStorage();