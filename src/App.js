import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/signup/Signup";
import Profil from "./pages/Profil/Profil";
import Transaction from "./pages/transaction/Transaction";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="profil" element={<Profil />} />
        <Route path="signup" element={<Signup />} />
        <Route path="transaction" element={<Transaction />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
