import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleItemClick = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center my-6">Your Cart</h1>
      {cart.length > 0 ? (
        cart.map((item) => (
          <div
            key={item.id}
            className="flex cursor-pointer justify-between items-center mb-4"
          >
            <img
              src={item.cover_image}
              alt={item.title}
              className="w-20 h-20"
              onClick={() => handleItemClick(item.id)}
            />
            <p className="font-bold">{item.title}</p>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleQuantityChange(item.id, parseInt(e.target.value, 10) || 1)
              }
              className="border rounded px-3 py-1 w-16 focus:border-purple-600"
            />
            <button
              onClick={() => handleRemove(item.id)}
              className="text-red-500 font-bold hover:underline"
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p className="text-2xl font-bold text-center mt-20">
          Your cart is empty!
        </p>
      )}
    </div>
  );
};

export default Cart;
