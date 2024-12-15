import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ShowBook from "./pages/ShowBook";
const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <Router>
      <Navbar currentUser={currentUser} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<Login setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/admin"
          element={
            currentUser?.is_admin ? <AdminDashboard /> : <Navigate to="/" />
          }
        />
        <Route path="/book/:id" element={<ShowBook />} />
      </Routes>
    </Router>
  );
};

export default App;
