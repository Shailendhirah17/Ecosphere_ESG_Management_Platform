import { useState, useEffect } from 'react';
import { api } from '../api/endpoints';

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');
  const [reportType, setReportType] = useState('carbon');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

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

  const generateReport = async (e) => {
    e.preventDefault();
    if (!selectedDept) return;

    setLoading(true);
    try {
      let response;
      if (reportType === 'carbon') {
        response = await api.reports.generateCarbonReport({ department_id: selectedDept });
      } else if (reportType === 'scorecard') {
        response = await api.reports.generateScorecardReport({ department_id: selectedDept });
      } else if (reportType === 'engagement') {
        response = await api.reports.generateEngagementReport({ department_id: selectedDept });
      }
      setReport(response.data?.data);
    } catch (error) {
      console.error('Failed to generate report:', error);
      alert('Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  const exportReport = async (format) => {
    try {
      if (reportType === 'carbon') {
        await api.reports.generateCarbonReport({ department_id: selectedDept, format });
      } else if (reportType === 'scorecard') {
        await api.reports.generateScorecardReport({ department_id: selectedDept, format });
      }
    } catch (error) {
      console.error('Failed to export report:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Reports</h1>

        {/* Report Controls */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <form onSubmit={generateReport} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="carbon">Carbon Emissions</option>
                  <option value="scorecard">ESG Scorecard</option>
                  <option value="engagement">Engagement</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? 'Generating...' : 'Generate Report'}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Report Display */}
        {report && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Report: {report.report_type}</h2>
              <div className="space-x-2">
                <button
                  onClick={() => exportReport('csv')}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                >
                  Export CSV
                </button>
                <button
                  onClick={() => exportReport('pdf')}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                >
                  Export PDF
                </button>
              </div>
            </div>

            {/* Carbon Report */}
            {report.report_type === 'CARBON_EMISSIONS' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-sm text-gray-600">Total Emissions</p>
                    <p className="text-2xl font-bold">{report.total_emissions.toFixed(2)} kg CO2</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-sm text-gray-600">Transactions</p>
                    <p className="text-2xl font-bold">{report.transaction_count}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-sm text-gray-600">Period</p>
                    <p className="text-sm">{report.period.start_date} to {report.period.end_date}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">By Category</h3>
                  <div className="space-y-2">
                    {Object.entries(report.by_category || {}).map(([category, data]) => (
                      <div key={category} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="capitalize">{category}</span>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{data.count} transactions</p>
                          <p className="font-semibold">{data.total.toFixed(2)} kg</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Scorecard Report */}
            {report.report_type === 'ESG_SCORECARD' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded">
                    <p className="text-sm text-gray-600">Overall</p>
                    <p className="text-3xl font-bold text-blue-600">{report.scores.overall}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded">
                    <p className="text-sm text-gray-600">Environmental</p>
                    <p className="text-3xl font-bold text-green-600">{report.scores.environmental}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded">
                    <p className="text-sm text-gray-600">Social</p>
                    <p className="text-3xl font-bold text-purple-600">{report.scores.social}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded">
                    <p className="text-sm text-gray-600">Governance</p>
                    <p className="text-3xl font-bold text-orange-600">{report.scores.governance}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Engagement Report */}
            {report.report_type === 'ENGAGEMENT' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-sm text-gray-600">CSR Activities</p>
                    <p className="text-2xl font-bold">{report.csr_activities}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-sm text-gray-600">Challenges</p>
                    <p className="text-2xl font-bold">{report.challenges}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-sm text-gray-600">Total Items</p>
                    <p className="text-2xl font-bold">{report.total_engagement_items}</p>
                  </div>
                </div>
              </div>
            )}

            <p className="text-xs text-gray-500 mt-6">Generated: {new Date(report.generated_at).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}
