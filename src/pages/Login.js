import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import logo from '../assets/img/logo.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [shake, setShake] = useState(false); // State for shake animation
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post('http://localhost/cleanease/backend/controllers/login.php', {
        username,
        password,
      },  { withCredentials: true });

      if (response.data.success) {
        navigate('/dashboard');
        console.log(response)
      } else {
        console.log('Login failed:', response);
        setErrorMessage('Invalid username or password');
        setShake(true); // Trigger shake animation

        // Remove shake animation after 500ms
        setTimeout(() => setShake(false), 500);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="bg-[#272e48] text-white flex items-center justify-center h-screen">
      <div
        className={`w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg transition-transform ${
          shake ? 'animate-shake' : ''
        }`}
      >
        <div className="flex justify-center">
          <img src={logo} alt="logo" className="w-16 h-16" />
        </div>
        <h2 className="text-2xl font-semibold text-center text-[#272e48]">Login</h2>
        
        {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-[#000000]">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#000000] focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-[#000000]">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#000000] focus:border-transparent"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="h-4 w-4 text-[#00C1D4]" />
                <label htmlFor="remember" className="ml-2 text-[#272e48]">Remember Me</label>
              </div>
              <a href="#" className="text-sm text-[#00C1D4] hover:underline">Forgot Password?</a>
            </div>
            <div>
              <button type="submit" className="w-full py-2 bg-[#00C1D4] text-white font-semibold rounded-md hover:bg-[#272e48] focus:outline-none focus:ring-2 focus:ring-[#272e48]">
                Log In
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Add Tailwind CSS animation */}
      <style>
        {`
          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            50% { transform: translateX(8px); }
            75% { transform: translateX(-8px); }
            100% { transform: translateX(0); }
          }
          .animate-shake {
            animation: shake 0.3s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
