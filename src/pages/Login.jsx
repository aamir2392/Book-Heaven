import React, { useState } from "react";
import users from "../data/users.json";
import { useNavigate } from "react-router-dom";

const Login = ({ setCurrentUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      if (user.is_admin) navigate("/admin");
      else navigate("/");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#a7ccb5] via-[#b295cf] to-[#9f1fc9] flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-center font-bold text-2xl mb-6 text-gray-800">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-gray-500 mb-2">
              Email
            </label>
            <input
              className="outline-none border-gray-400 border-b-2 w-full px-3 py-2 focus:border-purple-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type your email"
              name="email"
              id="email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-gray-500 mb-2">
              Password
            </label>
            <input
              className="outline-none border-gray-400 border-b-2 w-full px-3 py-2 focus:border-purple-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type your password"
              name="password"
              id="password"
            />
            <p className="text-right text-gray-500">Forgot Password?</p>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full font-bold bg-gradient-login text-white py-2 px-4 rounded-full hover:bg-gradient-login-reversed transition duration-500"
            >
              Login
            </button>
            <p className="text-center mt-3">
              Already have an account?{" "}
              <a
                href="#"
                className="text-purple-500 cursor-pointer hover:text-purple-700"
              >
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
