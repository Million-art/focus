import React, { useEffect } from 'react';
import Nav from '../../../components/Nav';
import User from './User';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../../helper/getUser';
import axios from 'axios';
import {apiBaseUrl} from '../../../helper/constant'

const Home = () => {
  const navigate = useNavigate();
  const user = getUser();

  
  useEffect(() => {
    // Redirect to login if user is not available
    if (!user) {
      navigate('/login');
     }
   

    // Set a timeout to automatically logout after 1 minute
    const timeoutId = setTimeout(async () => {
      try {
        // Clear user information from local storage
        localStorage.removeItem('user');

        // Make the logout request
        const logoutUser = await axios.post(
          `${apiBaseUrl}/employee/logout`,
          { id: user.employee_id },
          { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
        );

        if (logoutUser) {
          // Redirect to the login page if the logout was successful
          navigate('/login');
        }
      } catch (error) {
        console.error('Error during logout:', error);

        if (error.response && error.response.status === 404) {
          // Handle 404 error if needed
        }
      }
    }, 60 * 10000); // 1 minute in milliseconds

    // Cleanup the timeout when the component is unmounted
    return () => clearTimeout(timeoutId);
  }, [user, navigate]);

  return (
    <div>
      <Nav   />
      <User />
    </div>
  );
};

export default Home;
