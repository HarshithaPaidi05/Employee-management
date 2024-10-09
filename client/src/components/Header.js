
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.png'; 

const Header = ({ username, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); 
    navigate('/'); 
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '60px',
      backgroundColor: '#007bff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px',
      zIndex: 1000,
    }}>
      
      <div style={{ display: 'flex', alignItems: 'center',  }}>
        <img src={logo} alt="Logo" style={{ height: '50px', marginRight: '10px' }} />
        <span style={{ color: '#fff', fontWeight: 'bold' }}>DealsDray</span>
      </div>

      
      <nav style={{ display: 'flex', gap: '20px',marginRight: '800px' }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{ background: 'none', border: 'none', color: '#fff', fontSize: '16px', cursor: 'pointer' }}
        >
          Home
        </button>
        <button
          onClick={() => navigate('/employee-list')}
          style={{ background: 'none', border: 'none', color: '#fff', fontSize: '16px', cursor: 'pointer' }}
        >
          Employee List
        </button>
      </nav>

     
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ color: '#fff', fontSize: '16px' }}>{username}</span>
        <button
          onClick={handleLogout}
          style={{ backgroundColor: 'transparent', border: '1px solid white', color: '#fff', padding: '5px 10px', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
