import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center space-x-4 mb-8">
        <button
          className={`${
            showType === "table" ? "bg-sky-800" : "bg-sky-300"
          } hover:bg-sky-600 px-4 py-2 rounded-lg text-white transition duration-300`}
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className={`${
            showType === "card" ? "bg-sky-800" : "bg-sky-300"
          } hover:bg-sky-600 px-4 py-2 rounded-lg text-white transition duration-300`}
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-5xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
