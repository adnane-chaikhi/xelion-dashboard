import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-[#272e48] text-white flex flex-col justify-between min-h-screen">
            {/* Logo Section */}
            <div>
                <div className="p-4 flex items-center justify-center border-b border-blue-700">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-12 h-12 rounded-full"
                    />
                </div>
                
                {/* Navigation Menu */}
                <nav className="mt-4">
                    <ul>
                        <li className="p-4 hover:bg-[#00C1D4]">
                            <Link to="/dashboard/analytics">Analytics</Link>
                        </li>
                        <li className="p-4 hover:bg-[#00C1D4]">
                            <Link to="/dashboard/bookings">Bookings</Link>
                        </li>
                        <li className="p-4 hover:bg-[#00C1D4]">
                            <Link to="/services">Services</Link>
                        </li>
                        <li className="p-4 hover:bg-[#00C1D4]">
                            <Link to="/clients">Clients</Link>
                        </li>
                        <li className="p-4 hover:bg-[#00C1D4]">
                            <Link to="/reports">Reports</Link>
                        </li>
                        <li className="p-4 hover:bg-[#00C1D4]">
                            <Link to="/settings">Settings</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            
            {/* Logout Section */}
            <div className="p-4 border-t border-blue-700">
                <button
                    className="w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded"
                    onClick={() => alert("Logging out...")}
                >
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
