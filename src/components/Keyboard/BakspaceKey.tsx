// import FontAwesomeIcon from "react-icons/fa6";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

<FontAwesomeIcon icon="far fa-backspace" />;

const BackspaceKey = (): JSX.Element => {
  return (
    <button className="text-lg rounded-md font-bold mx-1 bg-gray-200 w-14 h-10 max-[480px]:w-11 max-[375px]:mx-[2px]">
      <FontAwesomeIcon icon={faDeleteLeft} className="-ms-1" />
    </button>
  );
};
export default BackspaceKey;
