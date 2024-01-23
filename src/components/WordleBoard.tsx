import { useState, useEffect } from "react";
import WordRow from "./Grid/WordRow";
import { useStore, WORD_LENGTH, GUESS_CHANCES } from "../utilities/store";
import { findDefinition } from "../utilities/word-utils";
import useGuess from "../hooks/useGuess";
import Button from "./Button";

export default function WordleBoard() {
  const state = useStore();
  const [guess, setGuess] = useGuess();
  const [definition, setDefinition] = useState<string>("");

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

  let rows = [...state.guessRows];

  if (rows.length < GUESS_CHANCES) {
    rows.push({ guess });
  }

  const guessesRemaining = GUESS_CHANCES - rows.length;

  rows = rows.concat(Array(guessesRemaining).fill(""));

  const isGameOver = state.gameState === "lost";
  // const gotAWinner = state.gameState === "won"; => NOT USING IT BY NOW
  const endOfGame = state.gameState !== "playing";

  return (
    <div className="flex flex-col justify-center max-w-[370px]">
      <main>
        {rows.map(({ guess, result }, index) => (
          <WordRow key={index} guessingWord={guess} result={result} />
        ))}
      </main>

      {!isGameOver && (
        <div className="mt-4 w-25 bg-slate-300  max-w-60">
          Meaning: "<span className="italic">{definition}</span>"
        </div>
      )}

      {endOfGame && (
        <div
          role="modal"
          className="absolute bg-opacity-90 bg-teal-100 border border-teal-600 rounded text-center w-[370px] h-[400px] p-4 left-0 right-0 mx-auto top-[110px] shadow-lg"
        >
          <p className="mt-3 font-bold tracking-wider uppercase">
            {isGameOver ? (
              <div>
                <span>Game over! 😵 </span>
              </div>
            ) : (
              <div>
                <span>Congratulations!</span>
                <br />
                <span>We've got a winner!</span>
              </div>
            )}
          </p>
          <div className="flex flex-col mx-10 mt-4 p-2 w-50 bg-orange-200 rounded shadow-lg justify-center">
            <p>The answer was:</p>
            <p className="text-center font-Inter font-bold text-[32px] uppercase tracking-widest">
              {state.answerWord}
            </p>
            <p className="mt-6">
              Definition: "<span className="italic">{definition}</span>"
            </p>
          </div>
          <Button
            children="New Game"
            color="black"
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
