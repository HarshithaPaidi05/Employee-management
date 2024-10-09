import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { EmployeeContext } from '../EmployeeContext';
import Header from './Header';
import './CreateEmployee.css';

const CreateEmployee = ({ username, onLogout = () => {} }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employees, setEmployees } = useContext(EmployeeContext);

  const isEditMode = location.state?.employee !== undefined;
  const employeeIndex = location.state?.index;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image: null,
    createDate: '',
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      const existingEmployee = location.state.employee;
      setFormData({
        name: existingEmployee.name,
        email: existingEmployee.email,
        mobile: existingEmployee.mobile,
        designation: existingEmployee.designation,
        gender: existingEmployee.gender,
        course: existingEmployee.course || [],
        image: existingEmployee.image || null,
        createDate: existingEmployee.createDate,
      });
      setPreviewImage(existingEmployee.image);
    }
  }, [isEditMode, location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        course: checked ? [...prev.course, value] : prev.course.filter((course) => course !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateMobile = (mobile) => {
    return /^\d{10}$/.test(mobile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

 
    if (!formData.name) validationErrors.name = 'Name is required';
    if (!formData.email) {
      validationErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      validationErrors.email = 'Email is not valid';
    } else if (employees.some((emp) => emp.email === formData.email && emp.email !== location.state?.employee?.email)) {
      validationErrors.email = 'Email already exists';
    }
    if (!formData.mobile) {
      validationErrors.mobile = 'Mobile number is required';
    } else if (!validateMobile(formData.mobile)) {
      validationErrors.mobile = 'Mobile number must be exactly 10 digits';
    }
    if (!formData.designation) validationErrors.designation = 'Designation is required';
    if (!formData.gender) validationErrors.gender = 'Gender is required';
    if (!formData.course.length) validationErrors.course = 'At least one course is required';
    if (!formData.image) validationErrors.image = 'Image is required';
    else if (!['image/jpeg', 'image/png'].includes(formData.image.type)) {
      validationErrors.image = 'Only jpg/png files are allowed';
    }

    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    
    const newEmployee = {
      ...formData,
      createDate: new Date().toISOString(),
    };

    if (isEditMode) {
      const updatedEmployees = [...employees];
      updatedEmployees[employeeIndex] = newEmployee;
      setEmployees(updatedEmployees);
    } else {
      setEmployees((prev) => [...prev, newEmployee]);
    }

    navigate('/employee-list');
  };

  return (
    <div className="create-employee-container">
      <Header username={username} onLogout={onLogout} />
      <h2>{isEditMode ? 'Edit Employee' : 'Create Employee'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}
        
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
        
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Mobile No"
          required
        />
        {errors.mobile && <span className="error">{errors.mobile}</span>}
        
        <select
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          required
        >
          <option value="">Select Designation</option>
          <option value="HR">HR</option>
          <option value="MANAGER">MANAGER</option>
          <option value="SALES">SALES</option>
        </select>
        {errors.designation && <span className="error">{errors.designation}</span>}
        
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
              required
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
              required
            />
            Female
          </label>
        </div>
        {errors.gender && <span className="error">{errors.gender}</span>}
        
        <div>
          <label>
            <input
              type="checkbox"
              name="course"
              value="MCA"
              checked={formData.course.includes('MCA')}
              onChange={handleChange}
            />
            MCA
          </label>
          <label>
            <input
              type="checkbox"
              name="course"
              value="BCA"
              checked={formData.course.includes('BCA')}
              onChange={handleChange}
            />
            BCA
          </label>
          <label>
            <input
              type="checkbox"
              name="course"
              value="BSC"
              checked={formData.course.includes('BSC')}
              onChange={handleChange}
            />
            BSC
          </label>
        </div>
        {errors.course && <span className="error">{errors.course}</span>}
        
        {previewImage && (
          <div className="image-preview">
            <img src={previewImage} alt="Employee Preview" width="100" height="100" />
          </div>
        )}
        
        <input
          type="file"
          name="image"
          accept=".jpg, .png"
          onChange={handleImageChange}
        />
        {errors.image && <span className="error">{errors.image}</span>}
        
        <button type="submit">{isEditMode ? 'Update' : 'Submit'}</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
