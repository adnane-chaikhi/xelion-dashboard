import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Users, BarChart, CreditCard, Wrench, Bell, Settings, LogOut , PanelTop  , Sun} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`bg-gray-900 text-white h-screen flex flex-col justify-between ${isOpen ? "w-64" : "w-20"} transition-all duration-300 p-4`}>
      
      {/* Top Section - Logo & Toggle Button */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <img src="/logo.png" alt="Logo" className={`transition-all duration-300 ${isOpen ? "w-32" : "w-8"} h-auto`} />
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? "⬅" : "➡"}
          </button>
        </div>

        {/* Menu Links */}
        <ul className="space-y-4">
          <SidebarItem icon={<Home />} text="Dashboard" to="/" isOpen={isOpen} />
          <SidebarItem icon={<Users />} text="Users" to="/users" isOpen={isOpen} />
          <SidebarItem icon={<BarChart />} text="Energy Production" to="/energy" isOpen={isOpen} />
          <SidebarItem icon={<CreditCard />} text="Billing" to="/billing" isOpen={isOpen} />
          <SidebarItem icon={<PanelTop/>} text="Installations" to="/installations" isOpen={isOpen} />
          <SidebarItem icon={<Wrench />} text="Maintenance" to="/maintenance" isOpen={isOpen} />
          <SidebarItem icon={<Bell />} text="Alerts" to="/alerts" isOpen={isOpen} />
          <SidebarItem icon={<Settings />} text="Settings" to="/settings" isOpen={isOpen} />
        </ul>
      </div>

      {/* Logout Button */}
      <button className="flex items-center space-x-2 p-2 rounded hover:bg-red-600 text-red-400" onClick={() => console.log("Logging out...")}>
        <LogOut />
        {isOpen && <span>Logout</span>}
      </button>
      
    </div>
  );
};

const SidebarItem = ({ icon, text, to, isOpen }) => (
  <li>
    <Link to={to} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
      {icon}
      {isOpen && <span>{text}</span>}
    </Link>
  </li>
);

export default Sidebar;
