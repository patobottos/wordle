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
}: WordRowProps) {
  const lettersRemaining = WORD_LENGTH - guessingWord.length;
  const lettersArray: string[] = guessingWord
    .split("")
    .concat(Array(lettersRemaining).fill(""));

  return (
    <div className="flex flex-col align-middle justify-center text-center">
      <div className="flex">
        {lettersArray.map((char, index) => {
          // HERE, IF GUESS === RANDOM WORD => return tiles ALL STATES GREEN : IF NOT =>
          return <Tile key={index} value={char} state={result[index]} />;
        })}
      </div>
    </div>
  );
}
