import Key from "./Key";
import EnterKey from "./EnterKey";
import BackspaceKey from "./BakspaceKey";

const Keyboard: React.FC = (): JSX.Element => {
  const set1: string[] = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const set2: string[] = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const set3: string[] = ["Z", "X", "C", "V", "B", "N", "M"];

  const Set1: React.FC = (): JSX.Element => {
    return (
      <div className="flex flex-row justify-center m-0">
        {set1.map((character, index) => {
          return <Key index={index} letter={character}></Key>;
        })}
      </div>
    );
  };

  const Set2: React.FC = (): JSX.Element => {
    return (
      <div className="flex flex-row justify-center m-0">
        {set2.map((character, index) => {
          return <Key index={index} letter={character}></Key>;
        })}
      </div>
    );
  };

  const Set3: React.FC = (): JSX.Element => {
    return (
      <div className="flex flex-row justify-center m-0">
        <EnterKey></EnterKey>

        {set3.map((character, index) => {
          return <Key index={index} letter={character}></Key>;
        })}

        <BackspaceKey></BackspaceKey>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center w-25 bg-slate-100 rounded-lg m-2 p-4 space-y-4">
      <Set1 />
      <Set2 />
      <Set3 />
    </div>
  );
};

export default Keyboard;
