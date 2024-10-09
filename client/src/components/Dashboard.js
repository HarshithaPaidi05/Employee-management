
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Header from './Header'; 

const Dashboard = ({ onLogout, username }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <Header username={username} onLogout={onLogout} /> 
      <h1 className="dashboard-heading">Dashboard</h1>
      <main>
        <h2 className="welcome-message">Welcome to the Admin Dashboard</h2>
      </main>
    </div>
  );
};

export default Dashboard;
