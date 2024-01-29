import React, { useState } from 'react';
import { MdEmail, MdLockOpen } from 'react-icons/md';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {apiBaseUrl} from '../../helper/constant'

import axios from 'axios';

const Account = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true); // State for email validation
  const [isLoading, setIsLoading] = useState(false); // State for loading state
 
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Basic email validation
    setIsValidEmail(validateEmail(e.target.value));
  };

  const validateEmail = (email) => {
    // Basic email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleUnlock = () => {
    if (!isValidEmail) return; // Do not proceed if email is not valid
  
    setIsLoading(true); // Set loading state while request is being made
  
    // Make POST request to unlock account
    axios
      .post(`${apiBaseUrl}/account/unlock`, { email })
      .then((response) => {
        // Handle successful response
        console.log('Unlocking account successful:', response.data);
        toast.success('Account unlocked successfully!');
      })
      .catch((error) => {
        // Handle error
        console.error('Error unlocking account:', error);
        toast.error('Error unlocking account. Please try again.');
      })
      .finally(() => {
        setIsLoading(false); // Reset loading state
      });
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <div className="mb-6">
        <ToastContainer />
          <div className="text-2xl font-bold mb-4">Unlock Account</div>
          <div className="flex items-center border-b border-gray-300 py-2">
            <MdEmail className="text-gray-500 mr-3" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={handleEmailChange}
              className={`appearance-none bg-transparent border-b-2 ${
                isValidEmail ? 'border-gray-500' : 'border-red-500'
              } w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none`}
            />
          </div>
          {!isValidEmail && (
            <p className="text-red-500 text-sm mt-2">Please enter a valid email address</p>
          )}
        </div>
        <button
          onClick={handleUnlock}
          disabled={!isValidEmail || isLoading} // Disable button if email is not valid or if request is loading
          className={`${
            isValidEmail ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500 cursor-not-allowed'
          } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center`}
        >
          {isLoading ? (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4c-2.137 0-4.08-.832-5.543-2.209l1.415-1.414z"
              ></path>
            </svg>
          ) : (
            <MdLockOpen className="text-xl mr-2" />
          )}
          Unlock
        </button>
      </div>
    </div>
  );
};

export default Account;
