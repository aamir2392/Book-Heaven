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
/**
 Create following pages:
1. Login 
2. Admin dashboard
3. Home page (Show Books - in cards)
4. Show Book (To show single book details)

Data:
users.json
books.json

user-scheme:
id, name, email, password, is_admin, profile_photo
book-scheme:
id, title, author, price, stock (quantity in stock), descrption, cover_image

agar admin login karay, tu wo admin dashboard par jayega. (filhal srf wahan likha ho - Admin Dashboard)
normal user home page par jayega. jahan us ko books show karwanay hain saray. book par click kar k single book details dikhani hain.

Navbar: Book Haven (Title)
Right Corner for user: Home, Pofile photo (click karo tu photo k nechay profile dikhanay k liye box show ho jaye)
Right Corner for admin: Dashboard, Profile phot (similar to user)
 */

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
