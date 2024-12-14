import React from "react";
import books from "../data/books.json";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <div key={book.id} className="border rounded p-4 shadow">
          <img
            src={book.cover_image}
            alt={book.title}
            className="h-auto w-full object-cover"
          />
          <h2 className="text-xl font-bold mt-2">{book.title}</h2>
          <p>{book.author}</p>
          <p>${book.price}</p>
          <Link
            to={`/book/${book.id}`}
            className="bg-[#712cf9] text-white py-1 px-2 rounded mt-2 inline-block"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;