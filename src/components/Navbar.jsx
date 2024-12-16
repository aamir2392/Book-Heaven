import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ currentUser }) => {
  // Background Color : #ffffffd9
  // Button Color : #712cf9

  const [isDropDown, setIsDropDown] = useState(false);

  const toggleDropDown = () => {
    setIsDropDown(!isDropDown);
  };
  return (
    <nav className="bg-[#8540f5] p-2 flex items-center justify-between">
      <Link to="/" className="text-white text-xl font-bold">
        Book Heaven
      </Link>
      <div className="flex items-center space-x-4">
        {currentUser ? (
          <>
            {currentUser.is_admin ? (
              <Link to="/admin" className="text-white">
                Dashboard
              </Link>
            ) : (
              <Link to="/" className="text-white">
                Home
              </Link>
            )}
            <div className="relative">
              <img
                src={currentUser.profile_photo}
                alt="Profile"
                className="h-8 w-8 rounded-full cursor-pointer"
                onClick={toggleDropDown}
              />
              {isDropDown && (
                <div
                  className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2 space-y-4 transition-all ease-in-out duration-300 opacity-100 transform scale-100"
                  style={{
                    boxShadow:
                      "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <h3>{currentUser.name}</h3>
                  <p>{currentUser.email}</p>
                  <button className="w-full font-bold bg-gradient-login text-white py-2 px-4 rounded-full hover:bg-gradient-login-reversed transition duration-500">
                    View Profile
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link
            to="/login"
            className="text-white font-bold border-2 px-3 py-1 rounded-full shadow-md hover:bg-purple-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
