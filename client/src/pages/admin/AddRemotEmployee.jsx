import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRemotEmployee } from '../../features/action';  
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUserPlus, faMagic  } from '@fortawesome/free-solid-svg-icons'; // Import icons
import {apiBaseUrl} from '../../helper/constant'

const AddRemotEmployee = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
     password: '',
   });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleGeneratePassword = () => {
    const generatedPassword = Math.random().toString(36).slice(-10);
    setFormData({ ...formData, password: generatedPassword });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formDataWithoutDate = { ...formData };

    if (formData.auto_generate_password) {
      const generatedPassword = Math.random().toString(36).slice(-8);
      formDataWithoutDate.password = generatedPassword;
    }

    try {
      const response = await axios.post(`${apiBaseUrl}/remotemployee/employees`, formDataWithoutDate);

      if (response.status === 201) {
        const { data } = response;
        dispatch(addRemotEmployee(data, 'data'));

        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          password: '',
         });
      } else {
        console.error('Error creating employee:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating employee:', error.message);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4">Add Remot Employees</h1>

      <form onSubmit={handleFormSubmit} className="mb-8 grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            className="border p-2 mb-4 w-full"
            required
          />

          <label className="block mb-2">Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            className="border p-2 mb-4 w-full"
            required
          />

          <label className="block mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border p-2 mb-4 w-full"
            required
          />
        
          <label className="block mb-2">Password:</label>
          <div className="flex mb-4 relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="border p-2 w-full"
              required={!formData.auto_generate_password}
            />
            <FontAwesomeIcon
              icon={passwordVisible ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              className="absolute top-0 right-12 m-4 cursor-pointer"
            />
            
          <span
            type="button"
            onClick={handleGeneratePassword}
            className=" outline outline-1 text-black cursor-pointer p-2 w-12 h-12 ml-2 rounded-full flex items-center justify-center" // Adjusted button styles
          >
            <FontAwesomeIcon icon={faMagic} />
          </span>
          </div>

          
        </div>

        <button type="submit" className="col-span-2 bg-blue-500 text-white p-2 w-64">
          <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddRemotEmployee;
