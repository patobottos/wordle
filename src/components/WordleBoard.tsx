import { useState, useEffect } from "react";
import WordRow from "./Grid/WordRow";
import { useStore, WORD_LENGTH, GUESS_CHANCES } from "../utilities/store";
import { findDefinition } from "../utilities/word-utils";
import Button from "./Button";

export default function WordleBoard() {
  const state = useStore();
  const [guess, setGuess] = useState<string>("");
  const [definition, setDefinition] = useState<string>("");
  //console.log("answer:", state.answerWord);
  //console.log("definition: ", definition);

  // FETCH THE DEFINITION OF THE RANDOM WORD
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await findDefinition(state.answerWord);
        setDefinition(result);
      } catch (error) {
        console.error("Error fetching definition:", error);
      }
    };
    fetchData();
  }, [state.answerWord]);

  let rows = [...state.guesses];

  let currentRow = 0;

  if (rows.length < GUESS_CHANCES) {
    currentRow = rows.push(guess);
  }

  const guessesRemaining = GUESS_CHANCES - rows.length;

  rows = rows.concat(Array(guessesRemaining).fill(""));

  const isGameOver = state.guesses.length === GUESS_CHANCES;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGuess = e.target.value;

    if (newGuess.length === WORD_LENGTH) {
      state.addGuess(newGuess);
      setGuess("");
      return;
    }

    setGuess(newGuess);
  };

  return (
    <div className="flex flex-col justify-center max-w-[370px]">
      <div>
        <input
          type="text"
          value={guess}
          onChange={onChange}
          disabled={isGameOver}
          placeholder="your guess here"
          className="m-1 border-2 border-gray-400"
        />
      </div>
      {rows.map((word, index) => (
        <WordRow key={index} guessingWord={word} />
      ))}

      <div className="mt-4 w-25 bg-slate-300  max-w-60">
        Meaning: "<span className="italic">{definition}</span>"
      </div>
      <br />

      {isGameOver && (
        <div
          role="modal"
          className="absolute bg-opacity-90 bg-white border border-gray-400 rounded text-center w-[370px] h-[400px] p-4 left-0 right-0 mx-auto top-[150px]"
        >
          <p className="mt-4 font-bold tracking-wider">GAME OVER!</p>
          <br />
          <div className="mx-10 w-25 bg-orange-300 justify-center">
            <p>The answer was: {state.answerWord}</p>
          </div>
          <Button
            children="New Game"
            onClick={() => {
              state.newGame();
              setGuess("");
            }}
          ></Button>
        </div>
      )}
    </div>
  );
}
