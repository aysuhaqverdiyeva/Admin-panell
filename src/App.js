import Sidebar from "./components/sidebar/Sidebar";
import Users from "./components/pages/users/Users";
import Application from "./components/pages/application/Application";
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Forgot from './pages/forgot/Forgot';
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

function App() {
  // Custom component to manage when to show Sidebar
  const MainLayout = () => {
    const location = useLocation();

    // Hide sidebar on specific routes
    const hideSidebarRoutes = ["/login", "/register", "/forgot"];
    const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

    return (
      <div className="container">
        {!shouldHideSidebar && <Sidebar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/application" element={<Application />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
        </Routes>
      </div>
    );
  };

  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;
