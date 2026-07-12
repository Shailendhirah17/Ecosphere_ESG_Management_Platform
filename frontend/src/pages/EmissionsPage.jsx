import { useState, useEffect } from 'react';
import { api } from '../api/endpoints';

export default function EmissionsPage() {
  const [emissions, setEmissions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    quantity: '',
    unit: 'kg',
    description: ''
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (selectedDept) {
      fetchEmissions();
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

  const fetchEmissions = async () => {
    try {
      setLoading(true);
      const response = await api.environmental.getCarbonTransactions(selectedDept);
      setEmissions(response.data?.data || []);
    } catch (error) {
      console.error('Failed to fetch emissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.environmental.createCarbonTransaction({
        department_id: selectedDept,
        ...formData
      });
      setFormData({ category: '', quantity: '', unit: 'kg', description: '' });
      fetchEmissions();
    } catch (error) {
      console.error('Failed to create transaction:', error);
    }
  };

  const totalEmissions = emissions.reduce((sum, e) => sum + (e.co2_equivalent || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Carbon Emissions Tracking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Record Emission</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {departments.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="energy">Energy</option>
                    <option value="travel">Travel</option>
                    <option value="waste">Waste</option>
                    <option value="water">Water</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="kg">kg</option>
                    <option value="ton">ton</option>
                    <option value="liter">liter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows="3"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                >
                  Record Emission
                </button>
              </form>
            </div>
          </div>

          {/* Emissions List */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Recent Emissions</h2>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total CO2 Equivalent</p>
                  <p className="text-2xl font-bold text-green-600">{totalEmissions.toFixed(2)} kg</p>
                </div>
              </div>

              {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
              ) : emissions.length === 0 ? (
                <p className="text-center text-gray-500">No emissions recorded yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2">Date</th>
                        <th className="text-left py-2 px-2">Category</th>
                        <th className="text-right py-2 px-2">Quantity</th>
                        <th className="text-right py-2 px-2">CO2 (kg)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emissions.map(e => (
                        <tr key={e.id} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-2">{new Date(e.date).toLocaleDateString()}</td>
                          <td className="py-2 px-2">{e.category}</td>
                          <td className="text-right py-2 px-2">{e.quantity} {e.unit}</td>
                          <td className="text-right py-2 px-2 font-semibold">{e.co2_equivalent.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
