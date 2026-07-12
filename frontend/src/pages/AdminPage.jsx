import { useState, useEffect } from 'react';
import { api } from '../api/endpoints';
import { useAuth } from '../context/AuthContext';

export default function AdminPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardData, setDashboardData] = useState(null);
  const [settings, setSettings] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetchDashboardData();
    } else if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'settings') {
      fetchSettings();
    }
  }, [activeTab]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.admin.getAdminPanel();
      setDashboardData(response.data?.data);
    } catch (error) {
      console.error('Failed to fetch dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.admin.getUserManagement();
      setUsers(response.data?.data || []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await api.settings.getSettings();
      setSettings(response.data?.data || {});
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    }
  };

  const updateSettings = async (e) => {
    e.preventDefault();
    try {
      await api.settings.updateSettings(settings);
      alert('Settings updated successfully!');
    } catch (error) {
      alert('Failed to update settings');
    }
  };

  const syncScores = async () => {
    try {
      setLoading(true);
      await api.admin.syncAllScores();
      alert('Scores synced successfully!');
    } catch (error) {
      alert('Failed to sync scores');
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'ESG Admin') {
    return <div className="p-8 text-center text-red-600">Access Denied: Admin Only</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {['dashboard', 'users', 'settings', 'reports'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {loading ? (
              <p>Loading...</p>
            ) : dashboardData ? (
              <>
                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white shadow rounded-lg p-6">
                    <p className="text-gray-600 text-sm">Departments</p>
                    <p className="text-3xl font-bold">{dashboardData.statistics?.total_departments || 0}</p>
                  </div>
                  <div className="bg-white shadow rounded-lg p-6">
                    <p className="text-gray-600 text-sm">Employees</p>
                    <p className="text-3xl font-bold">{dashboardData.statistics?.total_employees || 0}</p>
                  </div>
                  <div className="bg-white shadow rounded-lg p-6">
                    <p className="text-gray-600 text-sm">Badges</p>
                    <p className="text-3xl font-bold">{dashboardData.statistics?.total_badges || 0}</p>
                  </div>
                  <div className="bg-white shadow rounded-lg p-6">
                    <p className="text-gray-600 text-sm">Transactions</p>
                    <p className="text-3xl font-bold">{dashboardData.statistics?.total_transactions || 0}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                  <button
                    onClick={syncScores}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {loading ? 'Syncing...' : 'Sync All Scores'}
                  </button>
                </div>

                {/* Recent Activities */}
                {dashboardData.statistics?.recent_activities?.length > 0 && (
                  <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
                    <div className="space-y-2">
                      {dashboardData.statistics.recent_activities.slice(0, 5).map((activity, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="font-medium">{activity.title}</span>
                          <span className="text-sm text-gray-600">{activity.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : null}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white shadow rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 font-semibold">Role</th>
                    <th className="text-left py-3 px-4 font-semibold">Department</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{u.name}</td>
                      <td className="py-3 px-4">{u.email}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">{u.role}</span>
                      </td>
                      <td className="py-3 px-4">{u.department?.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <form onSubmit={updateSettings} className="bg-white shadow rounded-lg p-6 max-w-2xl">
            <h2 className="text-lg font-semibold mb-6">System Settings</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Environmental Weight</label>
                <input
                  type="number"
                  value={settings.env_weight || 40}
                  onChange={(e) => setSettings({ ...settings, env_weight: e.target.value })}
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Social Weight</label>
                <input
                  type="number"
                  value={settings.social_weight || 30}
                  onChange={(e) => setSettings({ ...settings, social_weight: e.target.value })}
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Governance Weight</label>
                <input
                  type="number"
                  value={settings.gov_weight || 30}
                  onChange={(e) => setSettings({ ...settings, gov_weight: e.target.value })}
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex items-center pt-4">
                <input
                  type="checkbox"
                  checked={settings.auto_emission_calc === 'true' || settings.auto_emission_calc === true}
                  onChange={(e) => setSettings({ ...settings, auto_emission_calc: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">Auto Emission Calculation</label>
              </div>

              <button
                type="submit"
                className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Settings
              </button>
            </div>
          </form>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">System Reports</h2>
            <p className="text-gray-600">Navigate to the Reports page to generate detailed reports.</p>
          </div>
        )}
      </div>
    </div>
  );
}
