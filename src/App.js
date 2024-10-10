
import Sidebar from "./components/sidebar/Sidebar";
import Users from "./components/pages/users/Users";
import Application from "./components/pages/application/Application"
import "./app.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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

