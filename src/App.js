import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Users from './components/Users';
// import Home from './components/Home';   // Home component (or any other components you want)
import Sidebar from './components/SideBar';
const App = () => {
  return (
    <Router>
      <div className="App">
        <div className="flex">
          {/* Sidebar is always visible */}
          <Sidebar />

          {/* Main content area */}
          <div className="flex-grow">
            <Routes>
              <Route path="/users" element={<Users />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
