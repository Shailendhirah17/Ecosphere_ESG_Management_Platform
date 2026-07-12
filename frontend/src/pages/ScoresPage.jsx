import { useState, useEffect } from 'react';
import { api } from '../api/endpoints';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ScoresPage() {
  const [scores, setScores] = useState(null);
  const [history, setHistory] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (selectedDept) {
      fetchScores();
      fetchScoreHistory();
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

  const fetchScores = async () => {
    try {
      setLoading(true);
      const response = await api.scoring.calculateScore(selectedDept);
      setScores(response.data?.data || null);
    } catch (error) {
      console.error('Failed to fetch scores:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchScoreHistory = async () => {
    try {
      const response = await api.scoring.getScoreHistory(selectedDept);
      setHistory(response.data?.data || []);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">ESG Scores</h1>

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

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : scores ? (
          <>
            {/* Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white shadow rounded-lg p-6 text-center">
                <p className="text-gray-600 mb-2">Overall Score</p>
                <p className={`text-4xl font-bold ${getScoreColor(scores.scores.overall)}`}>
                  {scores.scores.overall}
                </p>
              </div>

              <div className="bg-white shadow rounded-lg p-6 text-center">
                <p className="text-gray-600 mb-2">Environmental</p>
                <p className={`text-3xl font-bold ${getScoreColor(scores.scores.environmental)}`}>
                  {scores.scores.environmental}
                </p>
              </div>

              <div className="bg-white shadow rounded-lg p-6 text-center">
                <p className="text-gray-600 mb-2">Social</p>
                <p className={`text-3xl font-bold ${getScoreColor(scores.scores.social)}`}>
                  {scores.scores.social}
                </p>
              </div>

              <div className="bg-white shadow rounded-lg p-6 text-center">
                <p className="text-gray-600 mb-2">Governance</p>
                <p className={`text-3xl font-bold ${getScoreColor(scores.scores.governance)}`}>
                  {scores.scores.governance}
                </p>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">Score Breakdown</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Environmental Details</p>
                  <div className="mt-2 space-y-1 text-sm">
                    <p>Score: {scores.breakdown.envScore.score}</p>
                    <p>Emissions: {scores.breakdown.envScore.emissions} kg</p>
                    <p>Efficiency: {scores.breakdown.envScore.efficiency}%</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Social Details</p>
                  <div className="mt-2 space-y-1 text-sm">
                    <p>Score: {scores.breakdown.socialScore.score}</p>
                    <p>Hours: {scores.breakdown.socialScore.total_hours}</p>
                    <p>Participants: {scores.breakdown.socialScore.total_participations}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Weights</p>
                  <div className="mt-2 space-y-1 text-sm">
                    <p>Environmental: {scores.weights.envWeight}%</p>
                    <p>Social: {scores.weights.socialWeight}%</p>
                    <p>Governance: {scores.weights.govWeight}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Score Trend */}
            {history.length > 0 && (
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Score Trend</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={history}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="calculated_at" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="overall_score" stroke="#3b82f6" name="Overall" />
                    <Line type="monotone" dataKey="environmental_score" stroke="#10b981" name="Environmental" />
                    <Line type="monotone" dataKey="social_score" stroke="#8b5cf6" name="Social" />
                    <Line type="monotone" dataKey="governance_score" stroke="#f59e0b" name="Governance" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500">No scores available</p>
        )}
      </div>
    </div>
  );
}
