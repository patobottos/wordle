import { useState, useEffect, useRef } from "react";
import WordRow from "./Grid/WordRow";
import { useStore, WORD_LENGTH, GUESS_CHANCES } from "../utilities/store";
import { findDefinition, isValidGuess } from "../utilities/word-utils";
import Button from "./Button";
import HintButton from "./HintButton";
import Keyboard from "./Keyboard";
import Lottie from "lottie-react";
import confetti from "../assets/confetti.json";

export default function WordleBoard() {
  const state = useStore();
  const [guess, setGuess, addGuessLetter] = useGuess();
  const [getInvalidGuess, setInvalidGuess] = useState(false);
  const [definition, setDefinition] = useState<string>("");
  const [hint, setHint] = useState(false);

  useEffect(() => {
    let id: NodeJS.Timeout;
    if (getInvalidGuess) {
      id = setTimeout(() => setInvalidGuess(false), 2300);
    }
    return () => clearTimeout(id);
  }, [getInvalidGuess]);

  const addGuess = useStore((s) => s.addGuess);
  const previousGuess = usePrevious(guess);

  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === WORD_LENGTH) {
      const validateGuess = async () => {
        try {
          const validation = await isValidGuess(previousGuess);
          if (validation === true) {
            setInvalidGuess(false);
            addGuess(previousGuess);
          } else {
            setInvalidGuess(true);
            setGuess(previousGuess);
          }
        } catch (error) {
          console.error("Error validating guess:", error);
        }
      };

      validateGuess();
    }
  }, [guess, previousGuess, addGuess, setGuess]);

  // FETCHS THE DEFINITION OF THE RANDOM WORD
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

  let currentRow = 0;

  if (rows.length < GUESS_CHANCES) {
    currentRow = rows.push({ guess }) - 1;
  }

  const guessesRemaining = GUESS_CHANCES - rows.length;

  rows = rows.concat(Array(guessesRemaining).fill(""));

  const isGameOver = state.gameState === "lost";

  const endOfGame = state.gameState !== "playing";

  return (
    // THIS IS THE WORDLEBOARD
    <div className="flex-1 flex-col justify-center items-center flex-grow p-1 relative max-w-[420px] xxs:max-w-[359px]">
      {getInvalidGuess && (
        <div className="absolute top-[-28px] inset-0 mx-auto  bg-black rounded text-white font-Inter text-xs font-bold h-8 w-52 p-2 text-center  shadow-xl justify-center">
          Not in our word list! ¯\(0_o)/¯
        </div>
      )}

      <main>
        {rows.map(({ guess, result }, index) => (
          <WordRow
            key={index}
            guessingWord={guess}
            result={result}
            className={
              getInvalidGuess && currentRow === index ? "animate-headShake" : ""
            }
          />
        ))}
      </main>
      <div className="my-4 mx-auto flex justify-center items-center">
        <HintButton
          children="Give me a hint! 🙏 "
          onClick={() => setHint(true)}
          isVisible={!hint}
        ></HintButton>

        {!isGameOver && hint && state.gameState !== "won" && (
          <div className="bg-slate-200 my-4 text-center p-2 rounded">
            Meaning: "<span className="italic">{definition}</span>"
          </div>
        )}
      </div>
      <Keyboard onClick={(letter) => addGuessLetter(letter)} />

      {endOfGame && (
        <div
          role="modal"
          className="absolute top-0 bg-opacity-90 bg-teal-100 border border-teal-300 rounded text-center w-[380px] h-[400px] p-4 left-0 right-0 mx-auto shadow-2xl
          flex-grow max-w-[420px] xxs:max-w-[359px]
          "
        >
          <p className="mt-3 font-bold tracking-wider uppercase">
            {isGameOver ? (
              <div>
                <span>Game over! 😵 </span>
              </div>
            ) : (
              <div>
                <div className="absolute top-0 right-0 z-10 pointer-events-none">
                  <Lottie
                    animationData={confetti}
                    loop={true}
                    autoplay={true}
                    rendererSettings={{
                      preserveAspectRatio: "xMidYMid slice",
                    }}
                  ></Lottie>
                </div>
                <span>Congratulations!</span>
                <br />
                <span>We've got a winner!</span>
              </div>
            )}
          </p>
          <div className="flex flex-col mx-auto mt-4 p-2 w-[300px] bg-orange-200 rounded shadow-lg justify-center">
            <p>The answer was:</p>
            <p className="text-center font-Inter font-bold text-[32px] uppercase tracking-widest">
              {state.answerWord}
            </p>
            <p className="mt-6">
              Definition: "<span className="italic">{definition}</span>"
            </p>
          </div>
          <Button
            children="New Game!"
            onClick={() => {
              state.newGame();
              setGuess("");
              setHint(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

function useGuess(): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (letter: string) => void
] {
  const [guess, setGuess] = useState("");

  const addGuessLetter = (letter: string) => {
    setGuess((currentGuess) => {
      const newGuess =
        letter.length === 1 ? currentGuess + letter : currentGuess;
      console.log(letter, { currentGuess });

      switch (letter) {
        case "Backspace":
          return newGuess.slice(0, -1);
        case "Enter":
          if (newGuess.length === WORD_LENGTH) {
            return "";
          }
      }

      if (currentGuess.length === WORD_LENGTH) {
        return currentGuess;
      }

      return newGuess;
    });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const letter = e.key;
    addGuessLetter(letter);
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return [guess, setGuess, addGuessLetter];
}

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
