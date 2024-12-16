import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import ShowBook from "./pages/ShowBook";
import Cart from "./pages/Cart";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <Navbar currentUser={currentUser} />
      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={<HomePage />} />

        {/* Login Page Route */}
        <Route
          path="/login"
          element={<Login setCurrentUser={setCurrentUser} />}
        />

        {/* Admin Dashboard Route */}
        <Route
          path="/admin"
          element={
            currentUser?.is_admin ? <AdminDashboard /> : <Navigate to="/" />
          }
        />

        {/* Show Book Route */}
        <Route path="/book/:id" element={<ShowBook />} />

        {/* Cart Page Route */}
        <Route path="/cart" element={<Cart />} />

        {/* 404 Fallback Route */}
        <Route
          path="*"
          element={
            <div className="h-screen flex items-center justify-center">
              <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
