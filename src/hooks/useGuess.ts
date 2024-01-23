/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { WORD_LENGTH, useStore } from "../utilities/store";

function useGuess(): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (letter: string) => void
] {

  const addGuess = useStore((s) => s.addGuess);
  const [guess, setGuess] = useState("");
  const previousGuess = usePrevious(guess);

  const onKeyDown = (e: KeyboardEvent) => {
    const letter = e.key;

    setGuess((currentGuess) => {
      const newGuess = letter.length === 1 ? currentGuess + letter : currentGuess;
      console.log(letter, { currentGuess });

      switch (letter) {
        case 'Backspace':
          return newGuess.slice(0, -1);
        case 'Enter':
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


  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    }
  }, [])

  useEffect(() => {
    if (guess.length === 0 && previousGuess && previousGuess?.length === WORD_LENGTH) {
      addGuess(previousGuess);
    }
  }, [guess]);

  return [guess, setGuess];

}


function usePrevious<T>(value: T): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref: any = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default useGuess;