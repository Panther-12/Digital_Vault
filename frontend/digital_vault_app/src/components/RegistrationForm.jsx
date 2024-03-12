import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import NavBar from "./NavBar";

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/register', { username, email, password });
      const { token, user } = response.data;
      // Store token and user data in session
      document.cookie = `token=${token}; path=/`;
      sessionStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="w-full flex flex-col">
    <NavBar />
          <form onSubmit={handleSubmit} className="mt-7 flex justify-center items-center">
      <div className="p-4 w-3/4 bg-white rounded-lg shadow-lg overflow-hidden md:flex">
        <div className="md:w-1/2 bg-blue-400 p-8">
          <h2 className="text-3xl font-semibold mb-4 text-white">Register</h2>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="johndoe@gmail.com" className="w-full mb-4 px-3 py-2 rounded-lg bg-blue-200 text-blue-800" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full mb-4 px-3 py-2 rounded-lg bg-blue-200 text-blue-800" required />
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="w-full mb-4 px-3 py-2 rounded-lg bg-blue-200 text-blue-800" required />
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full mb-4 px-3 py-2 rounded-lg bg-blue-200 text-blue-800" required />
          <button type="submit" className="w-full bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Register</button>
        </div>
        <div className="md:w-1/2 p-8 hidden md:block">
          <img src="https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y3JlZGl0fGVufDB8fDB8fHww"alt="Registration" className="w-full h-auto object-cover rounded-lg" />
        </div>
      </div>
    </form>
    </div>

  );
}

export default RegistrationForm;
