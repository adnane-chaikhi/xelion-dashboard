import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png'

const Login = () => {
  return (
    <div className="bg-[#272e48] text-white flex items-center justify-center h-screen">
              <img src={logo} alt="logo" />
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-[#272e48]">Login</h2>
        <form action="#" method="POST">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-[#272e48]">Email</label>
              <input type="email" id="email" name="email" required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00C1D4] focus:border-transparent" />
            </div>
            <div>
              <label htmlFor="password" className="block text-[#272e48]">Password</label>
              <input type="password" id="password" name="password" required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00C1D4] focus:border-transparent" />
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
    </div>
  );
};

export default Login;
