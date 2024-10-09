
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import CreateEmployee from './components/CreateEmployee';
import EmployeeList from './components/EmployeeList';
import { EmployeeProvider } from './EmployeeContext';


const users = [
  { username: 'Harshitha', password: 'Harshi6858' },
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' }, 
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [currentUser, setCurrentUser] = useState('');

  const handleLogin = (username, password) => {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('token', 'your-token-here');
      localStorage.setItem('username', username); 
      setIsAuthenticated(true);
      setCurrentUser(username); 
    } else {
      alert('Invalid credentials!'); 
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username'); 
    setIsAuthenticated(false);
    setCurrentUser('');
  };

  return (
    <EmployeeProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard username={currentUser} onLogout={handleLogout} /> : <Navigate to="/" />}
          />
          <Route
            path="/create-employee"
            element={isAuthenticated ? <CreateEmployee username={currentUser} onLogout={handleLogout} /> : <Navigate to="/" />}
          />
          <Route
            path="/employee-list"
            element={isAuthenticated ? <EmployeeList username={currentUser} onLogout={handleLogout} /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </EmployeeProvider>
  );
}

export default App;
