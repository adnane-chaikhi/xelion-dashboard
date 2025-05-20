import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Axios from 'axios';
import logo from '../assets/img/logo.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(
        'http://localhost/cleanease/backend/controllers/login.php',
        { username, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        navigate('/dashboard');
      } else {
        setErrorMessage('Invalid username or password');
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="flex justify-center mb-6 top-[10%] left-1/2 transform -translate-x-1/2 absolute">
          <img src={logo} alt="Xelion" className="w-[220px] h-30"/>
        </div>
      {/* 🌞 Solar Background Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-yellow-400 opacity-30 animate-ping" />
        <div className="absolute bottom-[20%] right-[10%] w-[120px] h-[120px] border-2 border-yellow-500 rounded-full animate-spin-slow opacity-40" />
      </div>
      
      {/* 💬 Login Form */}
      <div
        className={`relative z-10 w-full max-w-md bg-[#1f2937] text-white rounded-2xl shadow-xl p-8 transition-transform ${
          shake ? 'animate-shake' : ''
        }`}
      >
        

        <h2 className="text-2xl text-center font-bold mb-6">LOGIN</h2>

        {errorMessage && (
          <p className="text-red-400 text-center text-sm mb-4">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 bg-[#111827] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-[#111827] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md transition"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-6">
          Don’t have an account?{' '}
          <Link to="/register" className="text-yellow-400 hover:underline">Sign Up</Link>
        </p>
      </div>

      {/* 🔧 CSS Animations */}
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

          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 18s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
