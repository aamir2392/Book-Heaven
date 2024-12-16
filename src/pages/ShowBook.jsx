import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import staticBooks from "../data/books.json";

const ShowBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve books from localStorage
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    // Combine static and stored books
    const combinedBooks = [...staticBooks, ...storedBooks];

    // Find the book by ID
    const foundBook = combinedBooks.find((b) => b.id.toString() === id);
    setBook(foundBook);
  }, [id]);

  const handleAddToCart = () => {
    if (quantity <= 0 || quantity > book.stock) {
      alert("Invalid quantity. Please enter a valid amount");
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === book.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...book, quantity });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Book added to cart");
    navigate("/cart");
  };

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
            <div className="mt-4">
              <label htmlFor="quantity" className="block mb-3 text-gray-600">
                Quantity:
              </label>
              <input
                className="outline-none border border-gray-500 rounded px-3 py-1 w-full"
                type="number"
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (!isNaN(value) && value >= 0) {
                    setQuantity(value);
                  }
                }}
              />
            </div>
            <button
              onClick={handleAddToCart}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 font-bold w-full rounded-full"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowBook;
