import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    price: "",
    stock: "",
    description: "",
    cover_image: "",
  });
  const [editingBook, setEditingBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("books")) || [];
    setBooks(savedBooks);
  }, []);

  // Save books to localStorage
  const saveBooks = (updatedBooks) => {
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
  };

  const handleSaveBook = () => {
    if (editingBook) {
      const updatedBooks = books.map((book) =>
        book.id === editingBook.id ? { ...editingBook, ...newBook } : book
      );
      saveBooks(updatedBooks);
    } else {
      const newEntry = { ...newBook, id: Date.now() };
      saveBooks([...books, newEntry]);
    }
    setNewBook({
      title: "",
      author: "",
      price: "",
      stock: "",
      description: "",
      cover_image: "",
    });
    setEditingBook(null);
    navigate("/");
  };

  const handleEditBook = (book) => {
    setEditingBook(book); // Set the book being edited
    setNewBook(book); // Populate the form with the book's current details
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-purple-600 underline mb-8">
        Admin Dashboard
      </h1>

      <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden mb-8">
        <thead className="bg-purple-500 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Title</th>
            <th className="py-2 px-4 text-left">Author</th>
            <th className="py-2 px-4 text-left">Price</th>
            <th className="py-2 px-4 text-left">Stock</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="even:bg-gray-100">
              <td className="py-2 px-4 border-t border-gray-300">
                {book.title}
              </td>
              <td className="py-2 px-4 border-t border-gray-300">
                {book.author}
              </td>
              <td className="py-2 px-4 border-t border-gray-300">
                ${book.price}
              </td>
              <td className="py-2 px-4 border-t border-gray-300">
                {book.stock}
              </td>
              <td className="py-2 px-4 border-t border-gray-300">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2"
                  onClick={() => handleEditBook(book)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  onClick={() => {
                    const updatedBooks = books.filter((b) => b.id !== book.id);
                    saveBooks(updatedBooks);
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        {editingBook ? "Edit Book" : "Add New Book"}
      </h2>
      <form className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <input
          type="text"
          value={newBook.title}
          placeholder="Title"
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={newBook.author}
          placeholder="Author"
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={newBook.price}
          placeholder="Price"
          onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          value={newBook.stock}
          placeholder="Stock"
          onChange={(e) => setNewBook({ ...newBook, stock: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Description"
          value={newBook.description}
          onChange={(e) =>
            setNewBook({ ...newBook, description: e.target.value })
          }
          className="w-full px-4 py-2 resize-none border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () =>
                setNewBook({ ...newBook, cover_image: reader.result });
              reader.readAsDataURL(file);
            }
          }}
          className="block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-blue-500 file:text-white hover:file:bg-blue-600"
        />
        <button
          type="button"
          onClick={handleSaveBook}
          className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600"
        >
          {editingBook ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;
