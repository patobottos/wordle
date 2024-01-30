import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

const BackspaceKey = (): JSX.Element => {
  return (
    <button className="text-lg rounded-md font-bold mx-1 bg-slate-200 w-12 h-10 max-[480px]:w-10 max-[375px]:mx-[2px]">
      <FontAwesomeIcon icon={faDeleteLeft} className="-ms-1" />
    </button>
  );
};
export default BackspaceKey;
