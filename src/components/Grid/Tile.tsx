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
    <div className="flex justify-center my-[2px] m-[2px] items-center w-[58px] h-[58px] border-2">
      <span
        className={`flex self-center font-Inter font-bold text-[32px] uppercase ${stateStyles}`}
      >
        {value}
      </span>
    </div>
  );
}
