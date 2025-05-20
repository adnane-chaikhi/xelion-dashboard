import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Installations() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    client_id: '',
    installer_id: '',
    panel_id: '',
    status: 'Pending',
    installed_at: ''
  });

  const [filterStatus, setFilterStatus] = useState('All');
  const [installations, setInstallations] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    const filtered = installations.filter((inst) => inst.status === filterStatus);
    setInstallations(filtered);
  };

  const toggleForm = () => setShowForm(!showForm);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 ">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-extrabold text-gray-600">⚙️ {t('installation_dashboard')}</h1>
        <button onClick={toggleForm} className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700">
          {showForm ? t('hide_form') :  t('add_installation')}
        </button>
      </div>

      {showForm && (
        <div className="bg-[#172137] shadow-2xl rounded-xl p-8 mb-12 border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-white">{t('installation_form')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">{t('client')}</label>
              <select name="client_id" value={formData.client_id} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg">
                <option value="">{t('select_client')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">{t('installer')}</label>
              <select name="installer_id" value={formData.installer_id} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg">
                <option value="">{t('select_installer')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">{t('panel')}</label>
              <select name="panel_id" value={formData.panel_id} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg">
                <option value="">{t('select_panel')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">{t('status')}</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg">
                <option value="Pending">{t('pending')}</option>
                <option value="Installed">{t('installed')}</option>
                <option value="Maintenance">{t('maintenance')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">{t('installed_at')}</label>
              <input type="datetime-local" name="installed_at" value={formData.installed_at} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
            </div>
          </div>

          <button type="submit" className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
            ➕ {t('create_installation')}
          </button>
        </div>
      )}

      <div className="bg-[#172137] shadow-xl rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">📋 {t('existing_installations')}</h2>
          <select value={filterStatus} onChange={handleFilterChange} className="border border-gray-300 rounded-lg p-2">
            <option value="All">{t('all_statuses')}</option>
            <option value="Pending">{t('pending')}</option>
            <option value="Installed">{t('installed')}</option>
            <option value="Maintenance">{t('maintenance')}</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left rounded-lg overflow-hidden">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-5 py-3 font-semibold text-gray-700">{t('client')}</th>
                <th className="px-5 py-3 font-semibold text-gray-700">{t('installer')}</th>
                <th className="px-5 py-3 font-semibold text-gray-700">{t('panel')}</th>
                <th className="px-5 py-3 font-semibold text-gray-700">{t('status')}</th>
                <th className="px-5 py-3 font-semibold text-gray-700">{t('date')}</th>
                <th className="px-5 py-3 font-semibold text-gray-700 text-center">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {installations.map((installation) => (
                <tr key={installation.id}>
                  <td className="px-5 py-3">{installation.client_name}</td>
                  <td className="px-5 py-3">{installation.installer_name}</td>
                  <td className="px-5 py-3">{installation.panel_type}</td>
                  <td className="px-5 py-3">
                    <span className="inline-block px-2 py-1 text-xs font-medium text-white bg-yellow-500 rounded">
                      {t(installation.status.toLowerCase())}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {new Date(installation.installed_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3 text-center space-x-2">
                    <button className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600">
                      {t('edit')}
                    </button>
                    <button className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600">
                      {t('delete')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
