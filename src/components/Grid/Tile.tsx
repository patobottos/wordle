import { LetterState, characterStateStyles } from "../../utilities/word-utils";

type TileProps = {
  value?: string;
  state?: LetterState;
};

export function Tile({ value, state }: TileProps) {
  const stateStyles =
    state == null
      ? "border-gray-500 text-black"
      : `${characterStateStyles[state]} text-white`;

  return (
    <div className="">
      <div
        className={`flex justify-center m-1 items-center w-[58px] h-[58px] border-2 self-center font-Inter font-bold text-[32px] uppercase 
        before:inline-block before:content-['_']
        ${stateStyles}`}
      >
        {value}
      </div>
    </div>
  );
}
