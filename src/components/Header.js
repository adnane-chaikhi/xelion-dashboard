import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa'; // Import the close icon

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Toggle the search bar visibility
  const handleSearchClick = () => {
    setIsSearchOpen(true); // Open the search bar
  };

  // Close the search bar
  const handleCloseSearch = () => {
    setIsSearchOpen(false); // Close the search bar
  };

  return (
    <header className="flex items-center justify-between p-4 bg-[#272e48] text-white relative">
      {/* Search Bar Icon on the Left */}
      <div className="flex items-center space-x-4">
        <div
          className="cursor-pointer"
          onClick={handleSearchClick}
        >
          <FaSearch size={20} />
        </div>
      </div>

      {/* Profile and Links on the Right */}
      <div className="flex items-center space-x-6">
        <div className="flex space-x-4">
          <a href="/services" className="hover:bg-[#00C1D4] px-3 py-2 rounded-md">Services</a>
          <a href="/schedule" className="hover:bg-[#00C1D4] px-3 py-2 rounded-md">Schedule</a>
        </div>

        <div className="relative group">
          {/* Profile Picture */}
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
          />
          {/* Profile Menu (Only visible on hover) */}
          <div className="absolute top-12 right-0 bg-white text-black shadow-md rounded-lg w-40 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ul>
              <li className="hover:bg-gray-200 px-3 py-2 cursor-pointer">Edit Profile</li>
              <li className="hover:bg-gray-200 px-3 py-2 cursor-pointer">Settings</li>
              <li className="hover:bg-gray-200 px-3 py-2 cursor-pointer">Logout</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div
        className={`absolute left-0 w-full bg-white p-4 transition-all duration-500 ${isSearchOpen ? 'top-0' : 'top-[-100%]'}`}
        style={{
          transition: 'top 0.5s ease-in-out',
        }}
      >
        <div className="flex items-center space-x-2">
          {/* Close Button */}
          <FaTimes
            size={20}
            className="cursor-pointer text-gray-500 hover:text-gray-800"
            onClick={handleCloseSearch} // Close the search bar when clicked
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-10 px-4 py-2 rounded-lg text-black"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
