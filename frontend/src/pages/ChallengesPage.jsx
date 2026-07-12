import React, { useState, useEffect } from 'react';
import { gamificationAPI } from '../api/endpoints';
import { Trophy, Zap, Target } from 'lucide-react';

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [difficulty, setDifficulty] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await gamificationAPI.getAllChallenges({ status: 'Active' });
        setChallenges(response.data.data);
        setFilteredChallenges(response.data.data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  useEffect(() => {
    if (difficulty === 'All') {
      setFilteredChallenges(challenges);
    } else {
      setFilteredChallenges(challenges.filter(c => c.difficulty === difficulty));
    }
  }, [difficulty, challenges]);

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading challenges...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Challenges</h1>
        <p className="text-purple-100">Complete challenges to earn XP and climb the leaderboard</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex gap-4">
          <button
            onClick={() => setDifficulty('All')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              difficulty === 'All'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {['Easy', 'Medium', 'Hard'].map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                difficulty === d
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => (
          <div key={challenge.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 text-white">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-lg">{challenge.title}</h3>
                <Target size={24} />
              </div>
            </div>

            <div className="p-4 space-y-3">
              <p className="text-gray-600 text-sm">{challenge.description}</p>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
                <div className="flex items-center gap-1 text-yellow-600 font-semibold">
                  <Zap size={18} />
                  {challenge.xp} XP
                </div>
              </div>

              {challenge.deadline && (
                <p className="text-xs text-gray-500">
                  Deadline: {new Date(challenge.deadline).toLocaleDateString()}
                </p>
              )}

              <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                Join Challenge
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredChallenges.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Trophy className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600 text-lg">No challenges found</p>
        </div>
      )}
    </div>
  );
}
