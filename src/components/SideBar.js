import { useState } from "react";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  Home,
  Users,
  BarChart,
  CreditCard,
  Wrench,
  Bell,
  Settings,
  LogOut,
  PanelTop,
} from "lucide-react";
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`bg-gray-900 text-white h-screen flex flex-col justify-between ${isOpen ? "w-64" : "w-20"} transition-all duration-300 p-4`}>
      
      {/* Top Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <img src="/logo.png" alt="Logo" className={`transition-all duration-300 ${isOpen ? "w-32" : "w-8"} h-auto`} />
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? "⬅" : "➡"}
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-6">{t('dashboard')}</h1>

        <ul className="space-y-4">
          <SidebarItem icon={<Home />} text={t('dashboard')} to="/" isOpen={isOpen} />
          <SidebarItem icon={<Users />} text={t('users')} to="/users" isOpen={isOpen} />
          <SidebarItem icon={<BarChart />} text={t('energy')} to="/energy_production" isOpen={isOpen} />
          <SidebarItem icon={<CreditCard />} text={t('billing')} to="/billing" isOpen={isOpen} />
          <SidebarItem icon={<PanelTop />} text={t('installations')} to="/installations" isOpen={isOpen} />
          <SidebarItem icon={<Wrench />} text={t('maintenance')} to="/maintenance" isOpen={isOpen} />
          <SidebarItem icon={<Bell />} text={t('alerts')} to="/alerts" isOpen={isOpen} />
          <SidebarItem icon={<Settings />} text={t('settings')} to="/settings" isOpen={isOpen} />
          <LanguageSwitcher />
        </ul>
      </div>

      {/* Logout Button */}
      <button
        className="flex items-center space-x-2 p-2 rounded hover:bg-red-600 text-red-400"
        onClick={() => console.log("Logging out...")}
      >
        <LogOut />
        {isOpen && <span>{t('logout')}</span>}
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
