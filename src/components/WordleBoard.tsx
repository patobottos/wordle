import { useState, useEffect } from "react";
import WordRow from "./Grid/WordRow";
import { useStore, WORD_LENGTH, GUESS_CHANCES } from "../utilities/store";
import { findDefinition } from "../utilities/word-utils";

export default function WordleBoard() {
  const state = useStore();
  const [guess, setGuess] = useState<string>("");
  const [definition, setDefinition] = useState<string>("");
  //console.log("answer:", state.answerWord);
  //console.log("definition: ", definition);

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
          placeholder="your guess here"
          className="m-1 border-2 border-gray-400"
        />
      </div>
      {rows.map((word, index) => (
        <WordRow key={index} guessingWord={word} />
      ))}

      <div className="mt-4 mx-10 w-25 bg-slate-300  max-w-60">
        <span>Meaning: {definition} </span>
      </div>
      <br />
      <div className="mx-10 w-25 bg-orange-300 justify-center">
        The answer is: {state.answerWord}
      </div>
    </div>
  );
}
