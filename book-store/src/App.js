import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import './proxy';
import Index from './pages/home';
import Category from "./pages/Category/Category";
import Customer from "./pages/Customer/Customer";
import Employee from "./pages/Employee/Employee";
import Order from "./pages/Order/Order";
import OrderDetail from './pages/Order/OrderDetail.jsx';
import Payment from "./pages/Payment/Payment";
import Book from "./pages/Book/Book";
import AddBook from "./pages/Book/AddBook";
import EditBook from "./pages/Book/EditBook";
import Role from "./pages/Role/Role";
import Subcategories from "./pages/Category/Subcategory";
import Permission from "./pages/Permisstion/Permisstion";
import Login from "./pages/login";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập của người dùng
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn === 'true') {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  function AdminElement({ children }) {
    const CURRENT_TYPE_USER = localStorage.getItem('roleName');

    if (CURRENT_TYPE_USER === "Admin") {
      return <>{children}</>;
    } else {
      return <Navigate to="/" />;
    }
  }

  function UserElement({ children }) {
    const CURRENT_TYPE_USER = localStorage.getItem('roleName');
    if (CURRENT_TYPE_USER === "Employee" || CURRENT_TYPE_USER === "Admin") {
      return <>{children}</>;
    } else {
      return <Navigate to="/Login" />;
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={loggedIn ? <Index /> : <Navigate to="/login" />} />
        <Route path="/category" element={loggedIn ? <UserElement><Category /></UserElement> : <Navigate to="/login" />} />
        <Route path="/Subcategories/:id" element={loggedIn ? <UserElement><Subcategories /></UserElement> : <Navigate to="/" />} />
        <Route path="/Role" element={loggedIn ? <AdminElement><Role /></AdminElement> : <Navigate to="/login" />} />
        <Route path="/employee" element={loggedIn ? <Employee /> : <Navigate to="/login" />} />
        <Route path="/customer" element={loggedIn ? <UserElement><Customer /></UserElement> : <Navigate to="/login" />} />
        <Route path="/order" element={loggedIn ? <UserElement><Order /></UserElement> : <Navigate to="/login" />} />
        <Route path="/OrderDetail/:id" element={loggedIn ? <OrderDetail /> : <Navigate to="/login" />} />
        <Route path="/payment" element={loggedIn ? <UserElement><Payment /> </UserElement> : <Navigate to="/login" />} />
        <Route path="/book" element={loggedIn ? <UserElement><Book /></UserElement> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        {/* <Route path="/Role" element={<Role />} /> */}
        <Route path="/Permisstion" element={loggedIn ? <AdminElement><Permission /></AdminElement> : <Navigate to="/login" />} />
        <Route path="/EditBook/:id" element={loggedIn ? <UserElement><EditBook /></UserElement> : <Navigate to="/login" />} />
        <Route path="/AddBook" element={loggedIn ? <UserElement><AddBook /></UserElement> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
