import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import LoginSuccess from "./pages/LoginSuccess";
import LoginFailure from "./pages/LoginFailure";
import Register from "./pages/Register";
import RegisterSuccess from "./pages/RegisterSuccess";
import RegisterFailure from "./pages/RegisterFailure";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route path="/login-failure" element={<LoginFailure />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-success" element={<RegisterSuccess />} />
        <Route path="/register-failure" element={<RegisterFailure />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
