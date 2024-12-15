import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import staticBooks from "../data/books.json";

const ShowBook = () => {
  const { id } = useParams();
  const [allBooks, setAllBooks] = useState([]);
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Retrieve books from localStorage
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    // Combine static and stored books
    const combinedBooks = [...staticBooks, ...storedBooks];
    setAllBooks(combinedBooks);

    // Find the book by ID
    const foundBook = combinedBooks.find((b) => b.id.toString() === id);
    setBook(foundBook);
  }, [id]);

  if (!book)
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl font-bold mt-8">Book not found!</p>
      </div>
    );

  return (
    <div className="p-8 min-h-screen bg-gray-100 overflow-y-hidden">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <img
            src={book.cover_image}
            alt={book.title}
            className="w-full md:w-1/3 object-cover"
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
