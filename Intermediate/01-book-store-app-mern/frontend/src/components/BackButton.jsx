import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex items-center mb-6">
      <Link
        to={destination}
        className="flex items-center bg-sky-800 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition duration-300 transform active:scale-95 focus:outline-none focus:ring focus:border-sky-800"
      >
        <BsArrowLeft className="text-3xl mr-2" />
        <span className="text-lg font-semibold">Back</span>
      </Link>
    </div>
  );
};

export default BackButton;
