import { Link, useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';


const NavBar = () => {

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
    <nav className="bg-blue-500 text-white flex justify-between items-center p-4">
            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full">
        <div className="transform rotate-45">
          <span className="text-blue-500 font-bold text-lg">
          <Link to="/" className="font-bold">DV</Link>
          </span>
        </div>
      </div>
      <div className="flex items-center">
        <Link to="/" className="font-bold mr-4">Digital Vault</Link>
        {
          isLoggedIn && <Link to="/dashboard" className="mr-4">Dashboard</Link>
        
        }
        <Link to="/documentation" className="mr-4">Documentation</Link>
      </div>
      {isLoggedIn ? (
        <button onClick={handleLogout} className="mr-4 text-xl text-white cursor-pointer border border-white rounded-lg px-4 py-2 transition duration-300 hover:bg-white hover:text-blue-500">Logout</button>
      ) : (
        <div>
          <Link to="/login" className="bg-white text-blue-500 px-4 py-2 rounded-lg mr-4">Login</Link>
          <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Register</Link>
        </div>
      )}

    </nav>
  );
}

export default NavBar;
