// Settings.jsx
import React, { useState } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="min-h-screen bg-[#111827] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-700 pb-2">
          {['account', 'system', 'roles', 'payment', 'notifications', 'integrations'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize px-4 py-2 rounded-md transition font-medium ${
                activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Content Panels */}
        {activeTab === 'account' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Account Settings</h2>
            <input type="text" placeholder="Full Name" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md" />
            <input type="email" placeholder="Email Address" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md" />
            <input type="password" placeholder="New Password" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md" />
            <button className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-700">Save Changes</button>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">System Preferences</h2>
            <input type="text" placeholder="Default Plan Name" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md" />
            <select className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md">
              <option>Monthly</option>
              <option>Quarterly</option>
            </select>
            <textarea placeholder="Notification Email Template" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md" />
            <button className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">Save Preferences</button>
          </div>
        )}

        {activeTab === 'roles' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">User Roles & Access</h2>
            <ul className="space-y-2">
              <li className="bg-gray-800 p-4 rounded-md">Admin - Full access</li>
              <li className="bg-gray-800 p-4 rounded-md">Technician - View & update installations</li>
              <li className="bg-gray-800 p-4 rounded-md">Support - View tickets & contact users</li>
            </ul>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Payment & Subscription</h2>
            <p className="text-gray-400">Current Plan: Premium</p>
            <p className="text-gray-400">Next Renewal: 2025-06-30</p>
            <button className="bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-600 text-black">Update Billing</button>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Notifications</h2>
            <label className="flex items-center gap-4">
              <input type="checkbox" className="w-4 h-4" />
              <span>Email Alerts for Overdue Invoices</span>
            </label>
            <label className="flex items-center gap-4">
              <input type="checkbox" className="w-4 h-4" />
              <span>SMS Alerts for Maintenance Reminders</span>
            </label>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Data & Integrations</h2>
            <input type="text" placeholder="Cloud Storage Path" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md" />
            <input type="text" placeholder="CRM API Key" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md" />
            <button className="bg-indigo-500 px-4 py-2 rounded-md hover:bg-indigo-600">Save Integration</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
