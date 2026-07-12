import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Medal, Trophy, Star } from 'lucide-react';
import { PageHeader, Card, Button } from '../components/common';

const topEmployees = [
  { name: 'John Smith', points: 4500, dept: 'Manufacturing' },
  { name: 'Jane Doe', points: 4200, dept: 'IT' },
  { name: 'Alice Johnson', points: 3800, dept: 'HQ' },
  { name: 'Bob Wilson', points: 3500, dept: 'Logistics' },
  { name: 'Sarah Brown', points: 3100, dept: 'HR' },
];

const topDepartments = [
  { name: 'Manufacturing', points: 12500 },
  { name: 'IT', points: 9800 },
  { name: 'HQ', points: 8500 },
  { name: 'Logistics', points: 6400 },
  { name: 'HR', points: 4200 },
];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('Monthly');
  const tabs = ['Weekly', 'Monthly', 'Yearly'];

  return (
    <div className="p-8">
      <PageHeader 
        title="Leaderboard" 
        breadcrumbs={[{ label: 'Gamification' }, { label: 'Leaderboard' }]} 
      />

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab
                ? 'bg-white text-green-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Top Employees Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-bold text-gray-900">Top Employees</h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topEmployees} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="points" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Departments Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Medal className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-bold text-gray-900">Top Departments</h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topDepartments} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="points" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
