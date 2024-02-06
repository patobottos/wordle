type HintButtonProps = {
  children?: React.ReactNode;
  onClick: () => void;
  isVisible: boolean; // New prop for visibility
};

const HintButton: React.FC<HintButtonProps> = ({
  children,
  onClick,
  isVisible,
}) => {
  return (
    isVisible && (
      <button
        onClick={onClick}
        className={`rounded bg-teal-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal tracking-wide text-black shadow-md hover:text-white hover:shadow-2xl hover:bg-teal-600 hover:ring-sky-500 animate-pulse font-medium`}
      >
        {children}
      </button>
    )
  );
};

export default HintButton;
