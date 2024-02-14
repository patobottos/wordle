function Footer() {
  return (
    <div className="flex flex-row justify-center mx-2 mt-8 mb-4 border-t-2 w-[94vw] text-xs pt-4 text-gray-700 xxs:mx-0.5 xs:mx-0.5 xxs:text-xx">
      <span className="mx-2 xxs:mx-1 xs:mx-1">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://patobottos.vercel.app/"
          className="decoration-inherit text-blue-800 cursor-pointer"
        >
          @Pato Bottos
        </a>
      </span>
      <span>|</span>
      <span className="mx-2 xxs:mx-1 xs:mx-1">
        Inspired by:{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://hswolff.com/"
          className="decoration-inherit text-blue-800 cursor-pointer"
        >
          Harry Wolff
        </a>
      </span>
      <span>|</span>
      <span className="mx-2 xxs:mx-1 xs:mx-1 text-gray-700 cursor-pointer">
        Barcelona, 2024
      </span>
    </div>
  );
}
export default Footer;
