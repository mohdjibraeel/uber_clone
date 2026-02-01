import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    // This runs AFTER the component mounts
    if (!token) {
      console.log("No token found, redirecting to login...");
      navigate('/login');
    }
  }, [token]); // Re-run if token changes

  // If there's no token, don't render the protected children
  if (!token) {
    return <div className='bg-red-600'>Loading...</div>; // Or a loading spinner
  }

  return <>{children}</>;
};

export default UserProtectWrapper;