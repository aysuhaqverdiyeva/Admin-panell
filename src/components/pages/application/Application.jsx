import React, { useState, useEffect } from 'react';
import Topbar from '../users/Topbar';
import UserCard from '../users/userCard';
import stats from '../users/json/stats.json';
import userData from '../users/json/usersData.json'; // Ensure the correct path
import applicationData from './applicationsData.json'; // New applications data
import './Application.css';

const Application = () => {
  const [users, setUsers] = useState([]); // State for users
  const [selectedUserId, setSelectedUserId] = useState(null); // State to track selected user
  const [selectedUserApplications, setSelectedUserApplications] = useState([]); // State for selected user applications
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Set users when the component mounts
    setUsers(userData);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleRowClick = (userId) => {
    if (selectedUserId === userId) {
      setSelectedUserId(null); // If the same user is clicked, collapse the details
      setSelectedUserApplications([]); // Reset the application details
    } else {
      setSelectedUserId(userId); // Set the selected user ID
      const userApplications = applicationData.filter(app => app.userId === userId); // Find applications for clicked user
      setSelectedUserApplications(userApplications); // Set the applications details
    }
  };

  // Filter users by status and search query
  const filteredUsers = users
    .filter((user) => {
      if (statusFilter === 'Active') {
        return user.status === 'Active';
      } else if (statusFilter === 'Inactive') {
        return user.status === 'Inactive';
      }
      return true;
    })
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="application-header">
      <div className='application-topBar'>
        <Topbar />
      </div>
      <div className='application-UserCard'>
        <UserCard stats={stats} />
      </div>
      <div className="tableHeader">
        <div className="tableHeaderText">
          <p className="allUsers">Bütün istifadəçilər</p>
          <p className="activeUsers">Aktiv istifadəçilər</p>
        </div>

        <div className="search-filter-container">
          {/* Axtarış inputu */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Axtarış"
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          {/* Filtrasiya */}
          <div className="filter-container">
            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="status-filter"
            >
              <option value="All">Bütün statuslar</option>
              <option value="Active">Aktiv</option>
              <option value="Inactive">Deaktiv</option>
            </select>
          </div>
        </div>
      </div>


      <table className="user-table">
        <thead>
          <tr>
            <th>İstifadəçinin adı</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <React.Fragment key={user.id}>
                <tr onClick={() => handleRowClick(user.id)} style={{ cursor: 'pointer' }}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button className={user.status === 'Active' ? 'status-active-btn' : 'status-inactive-btn'}>
                      {user.status}
                    </button>
                  </td>
                </tr>
                {/* Show selected user application details if the user is selected */}
                {selectedUserId === user.id && selectedUserApplications.length > 0 && (
                  selectedUserApplications.map(app => (
                    <tr key={app.id}>
                      <td colSpan="4">
                        <div className="user-details">
                          <h4>Müraciət</h4>
                          <p><strong>Sual:</strong> {app.question}</p>
                          <p><strong>Cavab:</strong> {app.answer}</p>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

  );
};

export default Application;
