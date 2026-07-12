import React from 'react';
import { useLocation } from 'react-router-dom';
import { Trophy, Star, Gift, Medal } from 'lucide-react';
import { Card, PageHeader, DataTable, Button } from '../components/common';

// --- Dummy Data ---
const challenges = [
  { id: 1, name: 'Bike to Work Week', description: 'Log 5 days of cycling to work.', reward: '500 Points', participants: 145, deadline: '2026-07-20', status: 'Active' },
  { id: 2, name: 'Zero Waste Month', description: 'Eliminate single-use plastics.', reward: '1000 Points', participants: 320, deadline: '2026-08-31', status: 'Active' },
  { id: 3, name: 'Energy Saver', description: 'Reduce home electricity by 10%.', reward: '750 Points', participants: 85, deadline: '2026-09-15', status: 'Upcoming' },
  { id: 4, name: 'Beach Clean-up', description: 'Join the weekend beach cleanup.', reward: '300 Points', participants: 50, deadline: '2026-06-10', status: 'Completed' },
];

const participation = [
  { id: 1, employee: 'Jane Doe', challenge: 'Zero Waste Month', progress: 80, points: 800, rank: 4, reward: 'Pending' },
  { id: 2, employee: 'John Smith', challenge: 'Bike to Work Week', progress: 100, points: 500, rank: 1, reward: 'Earned' },
  { id: 3, employee: 'Alice Johnson', challenge: 'Energy Saver', progress: 20, points: 150, rank: 45, reward: 'Pending' },
];

const badges = [
  { icon: Leaf, name: 'Eco Warrior', criteria: 'Complete 10 Environmental challenges', earned: 45 },
  { icon: Users, name: 'Community Leader', criteria: 'Lead 3 CSR Projects', earned: 12 },
  { icon: ShieldCheck, name: 'Compliance Champion', criteria: 'Maintain 100% policy acknowledgement', earned: 450 },
  { icon: Zap, name: 'Energy Saver', criteria: 'Win the Energy Saver challenge', earned: 85 },
];

import { Leaf, Users, ShieldCheck, Zap } from 'lucide-react';

const rewards = [
  { id: 1, name: 'Extra Vacation Day', points: 10000, stock: 'Unlimited' },
  { id: 2, name: '$50 Amazon Gift Card', points: 5000, stock: 45 },
  { id: 3, name: 'Company Swag Pack', points: 2000, stock: 120 },
  { id: 4, name: 'Donation to Charity ($100)', points: 8000, stock: 'Unlimited' },
];

// --- Sub-components ---

function ChallengesList() {
  const columns = [
    { header: 'Challenge', accessor: 'name', className: 'font-medium text-gray-900' },
    { header: 'Description', accessor: 'description' },
    { header: 'Reward', accessor: 'reward' },
    { header: 'Participants', accessor: 'participants' },
    { header: 'Deadline', accessor: 'deadline' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          row.status === 'Active' ? 'bg-green-100 text-green-800' : 
          row.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {row.status}
        </span>
      )
    },
  ];

  return (
    <div>
      <PageHeader title="Challenges" breadcrumbs={[{ label: 'Gamification' }, { label: 'Challenges' }]} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="Active Challenges" value="2" icon={Trophy} />
        <Card title="Upcoming" value="1" />
        <Card title="Completed" value="14" />
      </div>

      <DataTable columns={columns} data={challenges} searchPlaceholder="Search challenges..." />
    </div>
  );
}

function ChallengeParticipation() {
  const columns = [
    { header: 'Employee', accessor: 'employee', className: 'font-medium text-gray-900' },
    { header: 'Challenge', accessor: 'challenge' },
    { 
      header: 'Completion %', 
      accessor: 'progress',
      render: (row) => (
        <div className="w-full max-w-[150px] flex items-center gap-2">
          <div className="flex-grow bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${row.progress}%` }}></div>
          </div>
          <span className="text-xs text-gray-500 w-8">{row.progress}%</span>
        </div>
      )
    },
    { header: 'Points', accessor: 'points' },
    { header: 'Rank', accessor: 'rank', render: (row) => <span className="font-bold text-gray-700">#{row.rank}</span> },
    { 
      header: 'Reward', 
      accessor: 'reward',
      render: (row) => (
        <span className={`font-semibold ${row.reward === 'Earned' ? 'text-green-600' : 'text-gray-500'}`}>
          {row.reward}
        </span>
      )
    },
  ];

  return (
    <div>
      <PageHeader title="Challenge Participation" breadcrumbs={[{ label: 'Gamification' }, { label: 'Participation' }]} />
      <DataTable columns={columns} data={participation} searchPlaceholder="Search employees..." />
    </div>
  );
}

function Badges() {
  return (
    <div>
      <PageHeader title="Badges" breadcrumbs={[{ label: 'Gamification' }, { label: 'Badges' }]} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="p-4 bg-purple-50 text-purple-600 rounded-full mb-4">
                <Icon className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{badge.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{badge.criteria}</p>
              <div className="mt-auto px-4 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                Unlocked by {badge.earned} users
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Rewards() {
  const columns = [
    { header: 'Reward Name', accessor: 'name', className: 'font-medium text-gray-900' },
    { header: 'Points Required', accessor: 'points', render: (row) => <span className="text-blue-600 font-bold">{row.points}</span> },
    { header: 'Available Stock', accessor: 'stock' },
    {
      header: 'Action',
      accessor: 'action',
      render: () => <Button size="sm" variant="primary" icon={Gift} onClick={() => alert('Redeem action triggered (Demo)')}>Redeem</Button>
    }
  ];

  return (
    <div>
      <PageHeader title="Rewards Catalog" breadcrumbs={[{ label: 'Gamification' }, { label: 'Rewards' }]} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card title="Available Rewards" value="14" icon={Gift} />
        <Card title="Redeemed Rewards (All time)" value="845" icon={Star} />
      </div>

      <DataTable columns={columns} data={rewards} searchPlaceholder="Search rewards..." />
    </div>
  );
}

export default function ChallengesPage() {
  const location = useLocation();
  const path = location.pathname;

  if (path.includes('challenges')) return <div className="p-8"><ChallengesList /></div>;
  if (path.includes('challenge-participation')) return <div className="p-8"><ChallengeParticipation /></div>;
  if (path.includes('badges')) return <div className="p-8"><Badges /></div>;
  if (path.includes('rewards')) return <div className="p-8"><Rewards /></div>;

  // Fallback
  return <div className="p-8"><ChallengesList /></div>;
}
