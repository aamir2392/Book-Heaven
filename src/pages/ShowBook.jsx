import React from "react";
import { useParams } from "react-router-dom";
import books from "../data/books.json";

const ShowBook = () => {
  const { id } = useParams();
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) return <p className="text-center mt-8">Book not found!</p>;

  return (
    <div className="p-8 min-h-screen bg-gray-100 overflow-y-hidden">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <img
            src={book.cover_image}
            alt={book.title}
            className=" w-full md:w-1/3 object-cover"
          />
          <div className="p-6">
            <h1 className="text-4xl font-bold text-gray-800">{book.title}</h1>
            <p className="text-gray-600 mt-2">{book.author}</p>
            <p className="text-gray-800 font-semibold mt-4">${book.price}</p>
            <p className="text-gray-600 mt-4">{book.description}</p>
            <p className="text-gray-800 mt-4">
              <span className="font-bold">Stock:</span> {book.stock}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowBook;
