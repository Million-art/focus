import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {apiBaseUrl} from '../helper/constant'
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        setError('Please enter both email and password.');
        return;
      }

      setLoading(true);
      setError('');

      const RemotEmployeeLoginResponse = await axios.post(
        `https://iroll.niktradingplc.com/employee/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
      );

      const employee = RemotEmployeeLoginResponse.data.user;
      localStorage.setItem('user', JSON.stringify(employee));

      if (employee) {
        navigate('/remot');
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };

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

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
