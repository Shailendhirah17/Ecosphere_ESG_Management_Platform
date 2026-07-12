import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { departmentAPI, employeeAPI, environmentalAPI, socialAPI, gamificationAPI } from '../api/endpoints';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Award, Zap, TrendingUp, Users } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch departments
        const deptsRes = await departmentAPI.getAllDepartments();
        setDepartments(deptsRes.data.data);

        // Fetch employee stats
        if (user?.id) {
          const statsRes = await gamificationAPI.getGamificationStats(user.id);
          setStats(statsRes.data.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const chartData = [
    { name: 'Environmental', value: 78 },
    { name: 'Social', value: 85 },
    { name: 'Governance', value: 72 }
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b'];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}!</h1>
        <p className="text-green-100">Role: {user?.role}</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">XP Balance</p>
              <p className="text-3xl font-bold text-green-600">{stats?.xpBalance || 0}</p>
            </div>
            <Zap className="text-yellow-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Points Balance</p>
              <p className="text-3xl font-bold text-blue-600">{stats?.pointsBalance || 0}</p>
            </div>
            <Award className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Challenges Completed</p>
              <p className="text-3xl font-bold text-purple-600">{stats?.completedChallenges || 0}</p>
            </div>
            <TrendingUp className="text-purple-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Departments</p>
              <p className="text-3xl font-bold text-indigo-600">{departments.length}</p>
            </div>
            <Users className="text-indigo-500" size={32} />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ESG Score Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">ESG Score Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Trend */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Performance Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[
              { month: 'Jan', score: 60 },
              { month: 'Feb', score: 68 },
              { month: 'Mar', score: 72 },
              { month: 'Apr', score: 78 },
              { month: 'May', score: 82 },
              { month: 'Jun', score: 85 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Departments List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Departments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((dept) => (
            <div key={dept.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-800">{dept.name}</h3>
              <p className="text-sm text-gray-600">Code: {dept.code}</p>
              <p className="text-sm text-gray-600">Employees: {dept.employee_count}</p>
              <button
                onClick={() => setSelectedDept(dept.id)}
                className="mt-3 w-full bg-green-600 text-white py-1 rounded text-sm hover:bg-green-700 transition-colors"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
