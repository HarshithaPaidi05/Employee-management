import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { EmployeeProvider } from './EmployeeContext'; 
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <EmployeeProvider>
      <App />
    </EmployeeProvider>
  </React.StrictMode>
);
