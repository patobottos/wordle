import { WORD_LENGTH } from "../../utilities/store";
import { LetterState } from "../../utilities/word-utils";
import { Tile } from "./Tile";

type WordRowProps = {
  guessingWord: string;
  result?: LetterState[];
  className?: string;
};

export default function WordRow({
  guessingWord = "",
  result = [],
  className = "",
}: WordRowProps) {
  const lettersRemaining = WORD_LENGTH - guessingWord.length;
  const lettersArray: string[] = guessingWord
    .split("")
    .concat(Array(lettersRemaining).fill(""));

  return (
    <div className="flex flex-col justify-center items-center">
      <div className={`flex ${className}`}>
        {lettersArray.map((char, index) => {
          return <Tile key={index} value={char} state={result[index]} />;
        })}
      </div>
    </div>
  );
}
