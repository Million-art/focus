import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import {apiBaseUrl} from '../helper/constant'
import axios from 'axios'; 
 const Login = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
   const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      if (!email) {
        setError('Please enter email');
        return;
      }
  
      setLoading(true);
      setError('');
  
      const fullTimeLoginResponse = await axios.post(
        `${apiBaseUrl}/employee/login`,
        { email, is_login: false },
        { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
      );
  
      const employee = fullTimeLoginResponse.data;  
  
      localStorage.setItem('user', JSON.stringify(employee));
      console.log(employee);
  
      if (employee.position === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }  catch (error) {
      console.error('Error during login:', error);

      if (error.response) {
          if (error.response.status === 403) {
              setError('Unauthorized access.');
          } else if (error.response.status === 401) {
              setError('Invalid credentials.');
          } else {
              setError('An error occurred. Please try again later.');
          }
      } else {
          setError('Network error. Please try again later.');
      }
  } finally {
      setLoading(false);
  }
} 
  

  return (
    <div className="flex items-center justify-center bg-gray-800">
      <div className="bg-black p-8 shadow-md rounded-md w-96">
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>


          <div className="text-red-500 mb-4">{error}</div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
