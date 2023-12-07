import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 bg-discord-gray h-screen">
      <BackButton />
      <div className="bg-discord-dark p-4 rounded-lg shadow-md">
        <h1 className="text-3xl my-4 text-discord-white">Show Book</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col border-2 border-discord-light rounded-xl p-4">
            <div className="my-4">
              <span className="text-xl mr-4 text-discord-white">Title</span>
              <span className="text-discord-white">{book.title}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-discord-white">Author</span>
              <span className="text-discord-white">{book.author}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-discord-white">
                Publish Year
              </span>
              <span className="text-discord-white">{book.publishYear}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-discord-white">
                Create Time
              </span>
              <span className="text-discord-white">
                {new Date(book.createdAt).toString()}
              </span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-discord-white">
                Last Update Time
              </span>
              <span className="text-discord-white">
                {new Date(book.updatedAt).toString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowBook;
