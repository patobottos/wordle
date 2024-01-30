type KeyProps = {
  letter: string;
};

const Key: React.FC<KeyProps> = ({ letter }) => {
  return (
    <button className="text-sm rounded-md font-bold mx-1 bg-slate-200 w-8 h-10 max-[480px]:w-[6vw] max-[375px]:mx-[2px]">
      {letter}
    </button>
  );
};
export default Key;
