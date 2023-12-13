import { LetterState } from "../../utilities/word-utils";
import { Tile } from "./Tile";

type RowProps = {
  word: string;
  result?: LetterState[];
  className?: string;
};

export function Row({ word = "", result = [], className = "" }: RowProps) {
  return (
    <div className="flex flex-row justify-center items-center">
      {lettersPerRow.map((item) => (
        <Tile key={item} rowId={item} value={}></Tile>
      ))}
    </div>
  );
}
