import React, { useState, useEffect } from 'react';
import UserCard from './userCard';
import User from './user';
import TopBar from './Topbar';
import './users.css';

const Users = ({ displayPhone }) => {
  const [stats, setStats] = useState(null); // State for stats
  const [usersData, setUsersData] = useState([]); // State for usersData

  // Fetch stats.json and usersData.json
  useEffect(() => {
    // Fetch stats data
    fetch('/path/to/stats.json') // Replace with actual path
      .then((response) => response.json())
      .then((data) => setStats(data))
      .catch((error) => console.error('Error fetching stats:', error));

    // Fetch users data
    fetch('/path/to/usersData.json') // Replace with actual path
      .then((response) => response.json())
      .then((data) => setUsersData(data))
      .catch((error) => console.error('Error fetching users data:', error));
  }, []);

  const handleSearch = (query) => {
    console.log('Search Query:', query);
  };

  return (
    <div className="users-page">
      <TopBar onSearch={handleSearch} />
      {stats && <UserCard stats={stats} />} {/* Render UserCard when stats are loaded */}
      <User users={usersData} displayPhone={displayPhone} /> {/* Render User with dynamically loaded users data */}
    </div>
  );
};

export default Users;
