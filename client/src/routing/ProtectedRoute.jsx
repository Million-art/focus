import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, allowedRoles, ...rest }) => {
  function getUser() {
    let user = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
    } else {
      user = null;
    }
    return user;
  }
  const user = getUser(); 

  // Redirect to login if the user is not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Redirect to home if the user's role is not allowed
  if (!allowedRoles.includes(user.position)) {
    return <Navigate to="/" />;
  }

  return <Route {...rest} element={<Element />} />;
};

export default ProtectedRoute;
