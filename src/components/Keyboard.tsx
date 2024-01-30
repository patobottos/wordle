export default function Keyboard() {
  return (
    <div className="flex flex-col justify-center rounded-lg m-2 p-4 space-y-3">
      {keyboardKeys.map((keyboardRow, rowIndex) => {
        return (
          <div key={rowIndex} className="flex flex-row justify-center">
            {keyboardRow.map((char, index) => {
              let keyStyles =
                "text-sm rounded-md font-bold mx-1  w-8 h-10 max-[480px]:w-[6vw] max-[375px]:mx-[2px] uppercase flex-1 py-2";

              if (char !== "") {
                keyStyles += " bg-slate-200 ";
              }

              return (
                <button key={char + index} className={keyStyles}>
                  {char === "delete" ? backspace : char}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

const keyboardKeys: string[][] = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["", "a", "s", "d", "f", "g", "h", "j", "k", "l", ""],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];

const backspace = "BORRAR";
