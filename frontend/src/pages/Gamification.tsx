import React, { useEffect, useState } from 'react';
import { Award, Target, Trophy, Gift, Zap, Medal } from 'lucide-react';

export default function Gamification() {
  const [activeTab, setActiveTab] = useState<'challenges' | 'badges' | 'rewards' | 'leaderboard'>('challenges');
  const [challenges, setChallenges] = useState<any[]>([]);
  const [badges, setBadges] = useState<any[]>([]);
  const [rewards, setRewards] = useState<any[]>([]);

  useEffect(() => {
    if (activeTab === 'challenges') {
      fetch('http://localhost:3000/challenges').then(r => r.json()).then(setChallenges);
    } else if (activeTab === 'badges') {
      fetch('http://localhost:3000/badges').then(r => r.json()).then(setBadges);
    } else if (activeTab === 'rewards') {
      fetch('http://localhost:3000/rewards').then(r => r.json()).then(setRewards);
    }
  }, [activeTab]);

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-forest-900 dark:text-ivory tracking-tight mb-2 flex items-center gap-3">
            <div className="p-3 bg-bio-500/10 rounded-2xl text-bio-500">
              <Award className="w-8 h-8" />
            </div>
            Employee Gamification
          </h1>
          <p className="text-sage-500">
            Drive engagement through challenges, badges, and rewards.
          </p>
        </div>
      </div>

      <div className="flex space-x-1 bg-sage-100 dark:bg-ash-800 p-1.5 rounded-2xl w-fit mb-8 shadow-sm">
        <button
          onClick={() => setActiveTab('challenges')}
          className={`flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeTab === 'challenges' ? 'bg-white dark:bg-ash-900 text-forest-900 dark:text-ivory shadow-sm' : 'text-sage-600 dark:text-sage-400 hover:bg-white/50 dark:hover:bg-ash-900/50'}`}
        >
          <Target className="w-4 h-4 mr-2" />
          Challenges
        </button>
        <button
          onClick={() => setActiveTab('badges')}
          className={`flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeTab === 'badges' ? 'bg-white dark:bg-ash-900 text-forest-900 dark:text-ivory shadow-sm' : 'text-sage-600 dark:text-sage-400 hover:bg-white/50 dark:hover:bg-ash-900/50'}`}
        >
          <Medal className="w-4 h-4 mr-2" />
          Badges
        </button>
        <button
          onClick={() => setActiveTab('rewards')}
          className={`flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeTab === 'rewards' ? 'bg-white dark:bg-ash-900 text-forest-900 dark:text-ivory shadow-sm' : 'text-sage-600 dark:text-sage-400 hover:bg-white/50 dark:hover:bg-ash-900/50'}`}
        >
          <Gift className="w-4 h-4 mr-2" />
          Rewards
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeTab === 'leaderboard' ? 'bg-white dark:bg-ash-900 text-forest-900 dark:text-ivory shadow-sm' : 'text-sage-600 dark:text-sage-400 hover:bg-white/50 dark:hover:bg-ash-900/50'}`}
        >
          <Trophy className="w-4 h-4 mr-2" />
          Leaderboard
        </button>
      </div>

      <div className="bg-white dark:bg-ash-900 rounded-3xl border border-sage-100 dark:border-ash-800 shadow-sm min-h-[400px]">
        {activeTab === 'challenges' && (
          <div className="p-6">
            <h3 className="text-xl font-display font-bold text-forest-900 dark:text-ivory mb-6">Active Challenges</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {challenges.length === 0 ? (
                <div className="col-span-full py-16 flex flex-col items-center justify-center text-sage-500">
                  <Target className="w-12 h-12 text-sage-300 mb-4" />
                  <h4 className="text-lg font-display font-bold text-forest-900 dark:text-ivory mb-1">No challenges available</h4>
                  <p className="text-sage-500 text-sm">Check back later for new challenges.</p>
                </div>
              ) : challenges.map(c => (
                <div key={c.id} className="border border-sage-200 dark:border-ash-800 rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider bg-sage-100 text-sage-700 dark:bg-ash-800 dark:text-sage-300 rounded-lg">
                      {c.difficulty}
                    </span>
                    <span className="flex items-center text-bio-500 font-bold bg-bio-50 dark:bg-bio-900/20 px-3 py-1 rounded-lg text-sm">
                      <Zap className="w-4 h-4 mr-1" /> {c.xp_value} XP
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-forest-900 dark:text-ivory mb-2">{c.title}</h3>
                  <p className="text-sm text-sage-600 dark:text-sage-400 mb-6 flex-grow">{c.description}</p>
                  <button className="w-full py-3 bg-forest-900 hover:bg-forest-800 text-ivory rounded-xl text-sm font-semibold transition-colors shadow-sm">
                    Join Challenge
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'badges' && (
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {badges.length === 0 ? (
                <p className="col-span-full text-slate-500 text-center py-8">No badges configured.</p>
              ) : badges.map(b => (
                <div key={b.id} className="flex flex-col items-center justify-center p-4 border border-slate-100 dark:border-slate-800 rounded-xl text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{b.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {rewards.length === 0 ? (
                <p className="col-span-full text-slate-500 text-center py-8">No rewards cataloged.</p>
              ) : rewards.map(r => (
                <div key={r.id} className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col hover:shadow-lg transition-shadow">
                  <h3 className="font-bold text-slate-900 dark:text-white">{r.name}</h3>
                  <p className="text-sm text-slate-500 mt-2 mb-4 line-clamp-2">{r.description}</p>
                  <div className="mt-auto flex justify-between items-center">
                    <div>
                      <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{r.points_required}</span>
                      <span className="text-xs text-slate-500 ml-1">pts</span>
                    </div>
                    <button 
                      disabled={r.stock <= 0}
                      className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg disabled:opacity-50"
                    >
                      {r.stock > 0 ? 'Redeem' : 'Out of Stock'}
                    </button>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-2 text-right">{r.stock} remaining</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="p-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Top Earner Rankings</h3>
                <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                  <button className="px-3 py-1 text-xs font-medium rounded-md bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white">Individuals</button>
                  <button className="px-3 py-1 text-xs font-medium rounded-md text-slate-500">Departments</button>
                </div>
              </div>
              <div className="space-y-2">
                {/* Mock Leaderboard rows */}
                {[
                  { rank: 1, name: 'Alex Morgan', dept: 'Sustainability', pts: 4250 },
                  { rank: 2, name: 'Jordan Lee', dept: 'Human Resources', pts: 3800 },
                  { rank: 3, name: 'Sam Taylor', dept: 'Engineering', pts: 3100 },
                ].map(u => (
                  <div key={u.rank} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${u.rank === 1 ? 'bg-amber-100 text-amber-700' : u.rank === 2 ? 'bg-slate-200 text-slate-700' : u.rank === 3 ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'}`}>
                        #{u.rank}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">{u.name}</h4>
                        <p className="text-xs text-slate-500">{u.dept}</p>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {u.pts.toLocaleString()} XP
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'approvals' && (
          <div className="p-6 text-center text-slate-500">
            <CheckCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            No pending approvals in the queue.
          </div>
        )}
      </div>
    </div>
  );
}
