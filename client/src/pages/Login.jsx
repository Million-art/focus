import React, { useState, useEffect } from 'react';
import FullTimeEmployeeLoginForm from '../components/FullTimeEmployeeLoginForm'; // Corrected the import
import RemoteEmployeeLoginForm from '../components/RemotEmployeeLoginForm'; // Corrected the import
 
const Login = () => {
  const [isFullTimeEmployee, setIsFullTimeEmployee] = useState(false);
  const [isRemoteEmployee, setIsRemoteEmployee] = useState(false);
   const handleFullTimeEmployeeLogin = (data) => {
    console.log('Full Time Employee Login Data:', data);
  };

  const handleRemoteEmployeeLogin = (data) => {
    console.log('Remote Employee Login Data:', data);
  };

  const handleFullTimeEmployeeClick = () => {
    setIsFullTimeEmployee(true);
    setIsRemoteEmployee(false);
  };

  const handleRemoteEmployeeClick = () => {
    setIsFullTimeEmployee(false);
    setIsRemoteEmployee(true);
  };
   

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-800">
    <div className="bg-black p-8 shadow-md rounded-md w-96">
    <h1 className='text-white text-2xl text-center mb-5'>Login</h1>
      <h2 className="text-1xl font-semibold mb-4 text-center text-white cursor-pointer">
        <span
          onClick={handleFullTimeEmployeeClick}
          className={`cursor-pointer ${isFullTimeEmployee ? 'text-white' : 'text-gray-400'}`}
        >
          Full Time Employee
        </span>
        | |
        <span
          onClick={handleRemoteEmployeeClick}
          className={`cursor-pointer ${isRemoteEmployee ? 'text-white' : 'text-gray-400'}`}
        >
          Remote Employee
        </span>
      </h2>
      {isFullTimeEmployee && <FullTimeEmployeeLoginForm />}
      {isRemoteEmployee && <RemoteEmployeeLoginForm />}
    </div>
  </div>
);
};

export default Login;