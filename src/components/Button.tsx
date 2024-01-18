type ButtonProps = {
  children?: React.ReactNode;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`m-4 mt-6 mx-auto inline-block rounded bg-teal-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal tracking-wide text-black shadow-md hover:text-white hover:shadow-2xl hover:bg-teal-600 hover:ring-sky-500`}
    >
      {children}
    </button>
  );
};

export default Button;
