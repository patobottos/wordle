import { useEffect, useState } from "react";
import { WORD_LENGTH } from "../utilities/store";
import { useStore } from "zustand";


function useGuess() {



  const [guess, setGuess] = useState<string>("");

  const onKeyDown = (e: KeyboardEvent) => {
    let letter = e.key;

    setGuess((currentGuess) => {
      const newGuess = letter.length === 1 ? currentGuess + letter : currentGuess;
      console.log(letter, { currentGuess });

      switch (letter) {
        case 'Backspace':
          return newGuess.slice(0, -1);

      }

      if (currentGuess.length === WORD_LENGTH) {
        return currentGuess;
      }
      return newGuess;
    });



    /*
    setGuess((currentGuess) => {
      const newGuess = letter.length === 1 ? currentGuess + letter : currentGuess;

      switch (letter) {
        case `Backspace`: return newGuess.slice(0, -1);
      }

      if (currentGuess.length === WORD_LENGTH) {
        return currentGuess;
      }
      return newGuess;
    })

    */
  };


  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    }

  }, [])

  return [guess, setGuess];


}
export default useGuess;