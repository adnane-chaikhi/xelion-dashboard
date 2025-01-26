const Sidebar = () => {
    return (
        <aside className="w-64 bg-[#272e48] text-white flex flex-col justify-between min-h-screen">
            {/* Logo Section */}
            <div>
                <div className="p-4 flex items-center justify-center border-b border-blue-700">
                    <img
                        src="https://via.placeholder.com/50"
                        alt="Logo"
                        className="w-12 h-12 rounded-full"
                    />
                    <span className="ml-3 text-2xl font-bold">CleaningCo Admin</span>
                </div>
                {/* Navigation Menu */}
                <nav className="mt-4">
                    <ul>
                        <li className="p-4 hover:bg-blue-700">
                            <a href="#">Dashboard</a>
                        </li>
                        <li className="p-4 hover:bg-blue-700">
                            <a href="#">Bookings</a>
                        </li>
                        <li className="p-4 hover:bg-blue-700">
                            <a href="#">Services</a>
                        </li>
                        <li className="p-4 hover:bg-blue-700">
                            <a href="#">Clients</a>
                        </li>
                        <li className="p-4 hover:bg-blue-700">
                            <a href="#">Reports</a>
                        </li>
                        <li className="p-4 hover:bg-blue-700">
                            <a href="#">Settings</a>
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