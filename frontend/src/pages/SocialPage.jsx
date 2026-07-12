import { useState, useEffect } from 'react';
import { api } from '../api/endpoints';

export default function SocialPage() {
  const [activities, setActivities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: '',
    participant_count: '',
    impact_type: '',
    impact_value: ''
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (selectedDept) {
      fetchActivities();
    }
  }, [selectedDept]);

  const fetchDepartments = async () => {
    try {
      const response = await api.departments.getAll();
      setDepartments(response.data?.data || []);
      if (response.data?.data?.length > 0) {
        setSelectedDept(response.data.data[0].id);
      }
    } catch (error) {
      console.error('Failed to fetch departments:', error);
    }
  };

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await api.social.getActivities(selectedDept);
      setActivities(response.data?.data || []);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.social.createActivity({
        department_id: selectedDept,
        ...formData
      });
      setFormData({
        name: '',
        description: '',
        category_id: '',
        participant_count: '',
        impact_type: '',
        impact_value: ''
      });
      setShowForm(false);
      fetchActivities();
    } catch (error) {
      console.error('Failed to create activity:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">CSR Activities</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {showForm ? 'Cancel' : 'New Activity'}
          </button>
        </div>

        {/* Department Filter */}
        <div className="mb-6">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            {departments.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">New CSR Activity</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Activity Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="number"
                  placeholder="Participant Count"
                  value={formData.participant_count}
                  onChange={(e) => setFormData({ ...formData, participant_count: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows="3"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Impact Type"
                  value={formData.impact_type}
                  onChange={(e) => setFormData({ ...formData, impact_type: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Impact Value"
                  value={formData.impact_value}
                  onChange={(e) => setFormData({ ...formData, impact_value: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Create Activity
              </button>
            </form>
          </div>
        )}

        {/* Activities List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : activities.length === 0 ? (
            <p className="text-center text-gray-500 col-span-2">No activities recorded</p>
          ) : (
            activities.map(activity => (
              <div key={activity.id} className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{activity.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{activity.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Participants</p>
                    <p className="font-semibold">{activity.participant_count}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Impact</p>
                    <p className="font-semibold">{activity.impact_value} {activity.impact_type}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <span className={`px-3 py-1 rounded text-sm ${activity.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
