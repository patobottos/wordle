import { useEffect, useState } from "react";

function useGuess() {
  const [guess, setGuess] = useState();

  const onKeyDown = (e: KeyboardEvent) => {

    let letter = e.key;
    console.log('letter => ', letter);

  };


  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    }

  }, [])


}
export default useGuess