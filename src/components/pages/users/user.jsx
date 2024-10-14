import React, { useState, useEffect } from 'react';
import userData from './json/usersData.json'; // Adjust the path as needed
import statsData from './json/stats.json'; // Adjust the path as needed
import UserCard from './userCard';
import './user.css';

const User = ({ displayPhone = false }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    const [users, setUsers] = useState([]); // State for users
    const [stats, setStats] = useState({}); // State for stats

    useEffect(() => {
        // Set users and stats when the component mounts
        setUsers(userData);
        setStats(statsData);
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
    };

    const toggleStatus = (id) => {
        const updatedUsers = users.map((user) =>
            user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
        );
        setUsers(updatedUsers); // Update users state
    };

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

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="user-table-container">
            <UserCard stats={stats} /> 
            <div className="tableHeader">
                <div className="tableHeaderText">
                    <p className="allUsers">Bütün istifadəçilər</p>
                    <p className="activeUsers">Aktiv istifadəçilər </p>
                </div>

                <div className="search-filter-container">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Axtarış"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                    </div>

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

            {/* Cədvəl */}
            <table className="user-table">
                <thead>
                    <tr>
                        <th>İstifadəçinin adı</th>
                        <th>Email</th>
                        {displayPhone && <th>Telefon</th>}  {/* Telefon sütunu yalnız displayPhone true olduqda göstərilir */}
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.length > 0 ? (
                        currentUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                {displayPhone && <td>{user.phone}</td>}  {/* Telefon nömrəsi yalnız displayPhone true olduqda göstərilir */}
                                <td>
                                    <button
                                        className={user.status === 'Active' ? 'status-active-btn' : 'status-inactive-btn'}
                                        onClick={() => toggleStatus(user.id)}
                                    >
                                        {user.status}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No users available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Səhifələmə */}
            <div className="pagination">
                <button onClick={handlePrevClick} className="pagination-arrow">
                    &lt;
                </button>
                {[...Array(totalPages).keys()].map((number) => (
                    <button
                        key={number + 1}
                        onClick={() => paginate(number + 1)}
                        className={currentPage === number + 1 ? 'pagination-btn active' : 'pagination-btn'}
                    >
                        {number + 1}
                    </button>
                ))}
                <button onClick={handleNextClick} className="pagination-arrow">
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default User;
