import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faExclamationTriangle, faBan } from '@fortawesome/free-solid-svg-icons';
import './userCard.css';

const UserCard = ({ stats }) => {
    return (
        <div className="user-card">
            <div className="card-item">
                <div className="card-text">
                    <FontAwesomeIcon icon={faUser} className="card-icon" />
                    <h4>Ümumi istifadəçi sayı</h4>
                </div>
                <p>{stats.totalUsers}</p>
            </div>

            <div className="card-item">
                <div className="card-text">
                    <FontAwesomeIcon icon={faEnvelope} className="card-icon" />
                    <h4>Müraciət sayı</h4>
                </div>
                <p>{stats.requestsCount}</p>
            </div>

            <div className="card-item">
                <div className="card-text">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="card-icon" />
                    <h4>Məsləhət gözləyən</h4>
                </div>
                <p>{stats.pendingAdvice}</p>
            </div>

            <div className="card-item">
                <div className="card-text">
                    <FontAwesomeIcon icon={faBan} className="card-icon" />
                    <h4>Bloklanmış istifadəçilər</h4>
                </div>
                <p>{stats.blockedUsers}</p>
            </div>
        </div>
    );
};

export default UserCard;
