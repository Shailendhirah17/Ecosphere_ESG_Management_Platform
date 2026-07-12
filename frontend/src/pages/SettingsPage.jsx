import { useState, useEffect } from 'react';
import { api } from '../api/endpoints';
import { useAuth } from '../context/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    env_weight: 40,
    social_weight: 30,
    gov_weight: 30,
    auto_emission_calc: true,
    evidence_requirement: true,
    badge_auto_award: true,
    notification_enabled: true
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.settings.getSettings();
      if (response.data?.data) {
        setSettings(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    }
  };

  const handleWeightChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: parseInt(value)
    }));
  };

  const handleToggleChange = (field) => {
    setSettings(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate weights
    const total = settings.env_weight + settings.social_weight + settings.gov_weight;
    if (total !== 100) {
      setMessage(`Error: Weights must sum to 100. Current: ${total}`);
      setLoading(false);
      return;
    }

    try {
      await api.settings.updateSettings(settings);
      setMessage('Settings updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating settings');
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'ESG Admin') {
    return <div className="p-8 text-center text-red-600">Access Denied: Admin Only</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">ESG Settings</h1>

        {message && (
          <div className={`mb-4 p-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
          {/* Scoring Weights */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">ESG Scoring Weights</h2>
            <p className="text-sm text-gray-600 mb-4">Total must equal 100%</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Environmental (%)</label>
                <input
                  type="number"
                  name="env_weight"
                  value={settings.env_weight}
                  onChange={handleWeightChange}
                  min="0"
                  max="100"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${settings.env_weight}%` }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Social (%)</label>
                <input
                  type="number"
                  name="social_weight"
                  value={settings.social_weight}
                  onChange={handleWeightChange}
                  min="0"
                  max="100"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${settings.social_weight}%` }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Governance (%)</label>
                <input
                  type="number"
                  name="gov_weight"
                  value={settings.gov_weight}
                  onChange={handleWeightChange}
                  min="0"
                  max="100"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all"
                    style={{ width: `${settings.gov_weight}%` }}
                  />
                </div>
              </div>

              <div className="text-right text-sm font-semibold text-gray-700 mt-4">
                Total: {settings.env_weight + settings.social_weight + settings.gov_weight}%
              </div>
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Feature Toggles</h2>

            <div className="space-y-3">
              {[
                { key: 'auto_emission_calc', label: 'Auto Emission Calculation' },
                { key: 'evidence_requirement', label: 'Require Evidence for CSR' },
                { key: 'badge_auto_award', label: 'Auto Award Badges' },
                { key: 'notification_enabled', label: 'Enable Notifications' }
              ].map(toggle => (
                <label key={toggle.key} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[toggle.key]}
                    onChange={() => handleToggleChange(toggle.key)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="ml-2 text-gray-700">{toggle.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </form>
      </div>
    </div>
  );
}
