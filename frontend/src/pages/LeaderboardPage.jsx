import React, { useState, useEffect } from 'react';
import { employeeAPI } from '../api/endpoints';
import { Medal, User } from 'lucide-react';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await employeeAPI.getLeaderboard();
        setLeaderboard(response.data.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getMedalIcon = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading leaderboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
        <p className="text-yellow-100">Top performers in the EcoSphere community</p>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Rank</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Name</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Email</th>
                <th className="px-6 py-4 text-right font-semibold text-gray-800">XP</th>
                <th className="px-6 py-4 text-right font-semibold text-gray-800">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {leaderboard.map((employee, index) => (
                <tr key={employee.id} className={index < 3 ? 'bg-yellow-50' : 'hover:bg-gray-50'}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getMedalIcon(index + 1)}</span>
                      <span className="font-semibold text-gray-800">#{index + 1}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center text-white font-bold">
                        {employee.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-800">{employee.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{employee.email}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-semibold">
                      ⚡ {employee.xp_balance}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                      🎯 {employee.points_balance}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {leaderboard.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Medal className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600 text-lg">No employees yet</p>
        </div>
      )}
    </div>
  );
}
