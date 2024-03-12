// TokenExpirationChecker.js

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const checkTokenExpiration = () => {
  // Get the token from the session storage
  const token = sessionStorage.getItem('token');
  if (token) {
    // Decode the token to extract expiration time
    const decodedToken = jwt_decode(token);
    const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();

    // Check if the token has expired
    if (currentTime >= expirationTime) {
      // Token has expired, clear session and redirect to login page
      sessionStorage.removeItem('token');
      window.location.replace('/login'); // Redirect to login page
    }
  }
};

const TokenExpirationChecker = () => {
  const history = useNavigate();

  useEffect(() => {
    // Check token expiration every minute
    const interval = setInterval(checkTokenExpiration, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [history]);

  return null; // This component doesn't render anything
};

export default TokenExpirationChecker;
