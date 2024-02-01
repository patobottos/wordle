import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { handleKeyPress } from "../utilities/keyboard-utils";
import { useStore } from "../utilities/store";
import { LetterState } from "../utilities/word-utils";

interface KeyboardProps {
  onClick: (key: string) => void;
}

const keyboardKeys: string[][] = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["", "a", "s", "d", "f", "g", "h", "j", "k", "l", ""],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];

const backspace = "test hello"; // DELETE AT THE END, I THINK I'M NOT USING IT

export default function Keyboard({ onClick: onClickProps }: KeyboardProps) {
  const keyboardLetterState = useStore((s) => s.keyboardLetterState);
  console.log("estado letra teclado: ", keyboardLetterState);

  return (
    <div className="flex flex-col justify-center rounded-lg m-2 p-4 space-y-3">
      {keyboardKeys.map((keyboardRow, rowIndex) => {
        return (
          <div key={rowIndex} className="flex flex-row justify-center">
            {keyboardRow.map((char, index) => {
              let keyStyles =
                "text-sm rounded-md font-bold mx-1  w-8 h-10 max-[480px]:w-[6vw] max-[375px]:mx-[2px] uppercase flex-1 py-2";

              const letterState = keyStateStyles[keyboardLetterState[char]];

              if (char === "") {
                keyStyles += " pointer-events-none ";
              }

              if (char.length > 1) {
                keyStyles =
                  " text-xs uppercase rounded-md font-bold mx-1 bg-slate-200 w-14 h-10 max-[480px]:w-11 max-[375px]:mx-[2px] ";
              }

              if (letterState) {
                keyStyles += ` ${letterState}`;
              } else if (char !== "") {
                keyStyles += " bg-slate-200 ";
              }

              return char === "Backspace" ? (
                <button
                  key={char + index}
                  className="text-lg rounded-md font-bold mx-1 bg-slate-200 w-12 h-10 max-[480px]:w-10 max-[375px]:mx-[2px]"
                  onClick={(e) => handleKeyPress(e, onClickProps)}
                >
                  <FontAwesomeIcon icon={faDeleteLeft} className="-ms-1" />
                </button>
              ) : (
                <button
                  key={char + index}
                  className={keyStyles}
                  onClick={(e) => handleKeyPress(e, onClickProps)}
                >
                  {char === "Backspace" ? backspace : char}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

const keyStateStyles = {
  [LetterState.Miss]: "bg-gray-400",
  [LetterState.Present]: "bg-yellow-400",
  [LetterState.Match]: "bg-green-600",
};
