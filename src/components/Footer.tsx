function Footer() {
  return (
    <div className="flex flex-row justify-center mx-4 mt-8 mb-4 border-t-2 w-[90vw] text-xs pt-4 space-x-2 text-gray-700">
      <p className="cursor-pointer text-blue-800">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/patobottos"
        >
          @Pato Bottos
        </a>
      </p>
      <p>|</p>
      <p className="cursor-pointer">
        Inspired by:{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://hswolff.com/"
          className="text-blue-800"
        >
          Harry Wolff
        </a>
      </p>
      <p>|</p>
      <p>Barcelona, 2024</p>
    </div>
  );
}
export default Footer;
