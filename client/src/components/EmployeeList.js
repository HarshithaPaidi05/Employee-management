
import React, { useContext, useState } from 'react';
import { EmployeeContext } from '../EmployeeContext';
import { useNavigate } from 'react-router-dom';
import './EmployeeList.css';
import Header from './Header'; 

const EmployeeList = ({ username, onLogout }) => { 
  const { employees, setEmployees } = useContext(EmployeeContext);
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (index) => {
    navigate('/create-employee', { state: { employee: employees[index], index } });
  };

  const handleDelete = (index) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
  };

  const handleCreate = () => {
    navigate('/create-employee');
  };

  const filteredEmployees = employees.filter((employee) => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.mobile.includes(searchTerm) ||
    employee.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? 'N/A' : date.toLocaleDateString(); 
  };

  return (
    <div className="employee-list-container">
      <Header username={username} onLogout={onLogout} /> 
      <main>
        <div className="header-container">
          <div className="title-container">
            <h2 className="employee-list-title">Employee List</h2>
          </div>
          
          <div className="total-count">
            Total Count: {employees.length || 0}
          </div>
         
          <button className="create-employee-button" onClick={handleCreate}>
            Create Employee
          </button>
        </div>

       
        <div className="search-container">
          <label htmlFor="search" className="search-label">Search:</label>
          <input 
            type="text" 
            id="search"
            placeholder="Enter search keyword..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="search-input"
          />
        </div>

        <table className="employee-table">
          <thead>
            <tr>
              <th>Unique ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {employee.image ? (
                    <img 
                      src={URL.createObjectURL(employee.image)}
                      alt="Employee"
                      className="employee-image"
                    />
                  ) : (
                    <span>No Image</span> 
                  )}
                </td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{(employee.course || []).join(', ')}</td>
                <td>{formatDate(employee.createDate)}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default EmployeeList;
