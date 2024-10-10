
import "./app.css";
import React from "react";
import { BrowserRouter as Route, Routes } from 'react-router-dom';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Forgot from "./pages/forgot/Forgot";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/forgot-password" element={<Forgot/>}/>
      </Routes>
  );
}

export default App;

