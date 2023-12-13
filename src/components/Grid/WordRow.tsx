import { WORD_LENGTH } from "../../utilities/store";
import { Tile } from "./Tile";

type WordRowProps = {
  guessingWord: string;
};

export default function WordRow({ guessingWord = "" }: WordRowProps) {
  const lettersRemaining = WORD_LENGTH - guessingWord.length;
  const lettersArray: string[] = guessingWord
    .split("")
    .concat(Array(lettersRemaining).fill(""));

  return (
    <div className="flex flex-col align-middle justify-center text-center">
      <div className="grid grid-cols-5 mb-2">
        {lettersArray.map((char, index) => {
          return <Tile key={index} value={char} />;
        })}
      </div>
      <h2>The guessing word: {guessingWord}</h2>
    </div>
  );
}
