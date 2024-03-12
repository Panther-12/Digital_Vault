import  { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    // Check user's authentication status
    const checkAuthentication = async () => {
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
        const user = sessionStorage.getItem('user');

        if (user && token) {
          setIsLoggedIn(true);
        }
      }
      catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuthentication();
  }, []);

  const handleLogout = () => {
    // Clear session data
    sessionStorage.removeItem('user');
    // Redirect to login page
    history('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300 flex flex-col items-center justify-center ">
      <nav className="mb-8">
      {
          isLoggedIn && <Link to="/dashboard" className="mr-4 text-xl text-white">Dashboard</Link>
        
        }
        <Link to="/documentation" className="mr-4 text-xl text-white">Documentation</Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="mr-4 text-xl text-white cursor-pointer border border-white rounded-lg px-4 py-2 transition duration-300 hover:bg-white hover:text-blue-500">Logout</button>

        ) : (
          <>
            <Link to="/login" className="mr-4 text-xl text-white">Login</Link>
            <Link to="/register" className="mr-4 text-xl text-white">Register</Link>
          </>
        )}
      </nav>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">About Our Application</h1>
        <p className="text-lg">Welcome to our Digital Vault Hub application. This application allows users to securely store and manage their membership cards digitally.</p>
      </div>
    </div>
  );
}

export default HomePage;
