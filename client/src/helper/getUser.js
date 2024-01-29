export const getUser = () => {
  let userData = localStorage.getItem('user');

  if (userData) {
    // Parse the JSON string and access the 'user' property
    userData = JSON.parse(userData).user;
  } else {
    userData = null;
  }

  return userData;
};
