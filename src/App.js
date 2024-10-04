
import Sidebar from "./components/sidebar/Sidebar";
import Users from "./components/pages/users/Users";
import Application from "./components/pages/application/Application"
import "./app.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      
      <div className="container">
        <Sidebar />
        <Routes>
         
          <Route path="/users" element={<Users />} />
          <Route path="/application" element={<Application />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

