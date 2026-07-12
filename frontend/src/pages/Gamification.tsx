import React, { useEffect, useState } from 'react';
import { Award, Plus, Edit2, Trash2, Zap, Target, ArrowUpRight, Trophy, Users, Clock, Flame, Heart } from 'lucide-react';
import Modal from '../components/Modal';

export default function Gamification() {
  const [activeTab, setActiveTab] = useState<'challenges' | 'leaderboard' | 'kudos'>('challenges');

  // Data States
  const [challenges, setChallenges] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [wallets, setWallets] = useState<any[]>([]);
  const [participations, setParticipations] = useState<any[]>([]);
  const [kudosList, setKudosList] = useState<any[]>([]);

  // Current Employee (Mock)
  const currentEmployeeId = 'emp-demo';

  // Modal States
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isKudosModalOpen, setIsKudosModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>('');

  // Form States
  const [challengeForm, setChallengeForm] = useState({
    title: '', category_id: '', description: '', xp_value: '',
    difficulty: 'Medium', deadline: new Date().toISOString().split('T')[0], evidence_required: true,
    team_based: false, seasonal: false, event_start_date: '', event_end_date: ''
  });
  const [kudosForm, setKudosForm] = useState({ receiver_id: '', message: '' });

  const fetchData = () => {
    fetch('http://localhost:3000/challenges').then(r => r.json()).then(setChallenges).catch(console.error);
    fetch('http://localhost:3000/categories').then(r => r.json()).then(data => setCategories(data.filter((c:any) => c.type === 'CHALLENGE'))).catch(console.error);
    fetch('http://localhost:3000/employee-wallets').then(r => r.json()).then(setWallets).catch(console.error);
    fetch('http://localhost:3000/challenge-participations').then(r => r.json()).then(setParticipations).catch(console.error);
    fetch('http://localhost:3000/kudos').then(r => r.json()).then(setKudosList).catch(console.error);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload: any = {
        ...challengeForm,
        xp_value: parseInt(challengeForm.xp_value),
        deadline: new Date(challengeForm.deadline).toISOString(),
        status: 'Active'
      };
      if (challengeForm.seasonal && challengeForm.event_start_date && challengeForm.event_end_date) {
        payload.event_start_date = new Date(challengeForm.event_start_date).toISOString();
        payload.event_end_date = new Date(challengeForm.event_end_date).toISOString();
      } else {
        payload.seasonal = false;
        payload.event_start_date = null;
        payload.event_end_date = null;
      }

      const res = await fetch('http://localhost:3000/challenges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setIsChallengeModalOpen(false);
        setChallengeForm({ title: '', category_id: '', description: '', xp_value: '', difficulty: 'Medium', deadline: new Date().toISOString().split('T')[0], evidence_required: true, team_based: false, seasonal: false, event_start_date: '', event_end_date: '' });
        fetchData();
      } else {
        alert('Failed to create challenge');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleJoinChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:3000/challenge-participations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challenge_id: selectedChallengeId,
          employee_id: currentEmployeeId,
          progress_pct: 0,
          approval_status: 'Pending',
          xp_awarded: 0
        })
      });
      if (res.ok) {
        setIsJoinModalOpen(false);
        setSelectedChallengeId('');
        fetchData();
      } else {
        alert('Failed to join challenge');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendKudos = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:3000/kudos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender_id: currentEmployeeId,
          receiver_id: kudosForm.receiver_id,
          message: kudosForm.message,
          points: 50
        })
      });
      if (res.ok) {
        setIsKudosModalOpen(false);
        setKudosForm({ receiver_id: '', message: '' });
        fetchData();
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to send kudos');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryName = (id: string) => categories.find(c => c.id === id)?.name || id;
  const leaderboard = [...wallets].sort((a, b) => b.lifetime_earned - a.lifetime_earned);
  const myWallet = wallets.find(w => w.employee_id === currentEmployeeId) || { balance: 0, lifetime_earned: 0, streak_count: 0 };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-forest-900 dark:text-ivory tracking-tight mb-2 flex items-center gap-3">
            <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-500">
              <Award className="w-8 h-8" />
            </div>
            Gamification Engine
          </h1>
          <p className="text-sage-500">
            Motivate employees through challenges, XP points, and rewards.
          </p>
        </div>

        {/* Mini Profile / Streaks */}
        <div className="flex items-center gap-4 bg-white dark:bg-ash-900 p-4 rounded-2xl border border-sage-100 dark:border-ash-800 shadow-sm">
          <div className="flex flex-col items-center px-4 border-r border-sage-200 dark:border-ash-800">
            <div className="flex items-center text-orange-500 font-display font-bold text-xl">
              <Flame className="w-5 h-5 mr-1" fill="currentColor" /> {myWallet.streak_count}
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-sage-500">Week Streak</span>
          </div>
          <div className="flex flex-col items-center px-4">
            <div className="text-indigo-600 dark:text-indigo-400 font-display font-bold text-xl">
              {myWallet.balance.toLocaleString()}
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-sage-500">Available XP</span>
          </div>
        </div>
      </div>

      <div className="flex space-x-1 bg-sage-100 dark:bg-ash-800 p-1.5 rounded-2xl w-fit mb-8 shadow-sm overflow-x-auto">
        <button
          onClick={() => setActiveTab('challenges')}
          className={`flex items-center px-5 py-2.5 text-sm font-semibold whitespace-nowrap rounded-xl transition-all ${activeTab === 'challenges' ? 'bg-white dark:bg-ash-900 text-indigo-700 dark:text-indigo-400 shadow-sm' : 'text-sage-600 dark:text-sage-400 hover:bg-white/50 dark:hover:bg-ash-900/50'}`}
        >
          <Target className="w-4 h-4 mr-2" />
          Active Challenges
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex items-center px-5 py-2.5 text-sm font-semibold whitespace-nowrap rounded-xl transition-all ${activeTab === 'leaderboard' ? 'bg-white dark:bg-ash-900 text-indigo-700 dark:text-indigo-400 shadow-sm' : 'text-sage-600 dark:text-sage-400 hover:bg-white/50 dark:hover:bg-ash-900/50'}`}
        >
          <Trophy className="w-4 h-4 mr-2" />
          Leaderboard
        </button>
        <button
          onClick={() => setActiveTab('kudos')}
          className={`flex items-center px-5 py-2.5 text-sm font-semibold whitespace-nowrap rounded-xl transition-all ${activeTab === 'kudos' ? 'bg-white dark:bg-ash-900 text-pink-600 dark:text-pink-400 shadow-sm' : 'text-sage-600 dark:text-sage-400 hover:bg-white/50 dark:hover:bg-ash-900/50'}`}
        >
          <Heart className="w-4 h-4 mr-2" />
          Kudos Feed
        </button>
      </div>

      <div className="bg-white dark:bg-ash-900 rounded-3xl border border-sage-100 dark:border-ash-800 shadow-sm overflow-hidden min-h-[400px]">
        {activeTab === 'challenges' && (
          <div className="overflow-x-auto">
            <div className="p-6 border-b border-sage-100 dark:border-ash-800 flex justify-between items-center bg-ivory dark:bg-ash-900/50">
              <h3 className="text-xl font-display font-bold text-forest-900 dark:text-ivory">Monthly Challenges</h3>
              <button 
                onClick={() => setIsChallengeModalOpen(true)}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl text-sm font-medium transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 mr-1" /> Create Challenge
              </button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.length === 0 ? (
                <div className="col-span-full py-12 flex flex-col items-center justify-center text-sage-400">
                  <Target className="w-12 h-12 mb-4 opacity-50" />
                  <p>No active challenges found.</p>
                </div>
              ) : (
                challenges.map(c => {
                  const isJoined = participations.some(p => p.challenge_id === c.id && p.employee_id === currentEmployeeId);
                  
                  // Calculate days left for seasonal challenges
                  let daysLeftText = '';
                  if (c.seasonal && c.event_end_date) {
                    const end = new Date(c.event_end_date);
                    const now = new Date();
                    const diffTime = Math.max(0, end.getTime() - now.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    daysLeftText = diffDays > 0 ? `${diffDays} days left` : 'Ended';
                  }

                  return (
                    <div key={c.id} className="border border-sage-200 dark:border-ash-800 rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col bg-white dark:bg-ash-900 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Award className="w-24 h-24 text-indigo-500" />
                      </div>
                      
                      <div className="flex flex-wrap gap-2 items-center mb-4 relative z-10">
                        <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-lg">
                          {getCategoryName(c.category_id)}
                        </span>
                        
                        {c.team_based && (
                          <span className="flex items-center px-2 py-1 text-[10px] uppercase font-bold tracking-wider bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg">
                            <Users className="w-3 h-3 mr-1" /> Team
                          </span>
                        )}
                        
                        {c.seasonal && (
                          <span className="flex items-center px-2 py-1 text-[10px] uppercase font-bold tracking-wider bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg">
                            <Clock className="w-3 h-3 mr-1" /> {daysLeftText || 'Limited'}
                          </span>
                        )}

                        <div className="ml-auto flex items-center bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 px-2 py-1 rounded-lg text-xs font-bold">
                          <Zap className="w-3 h-3 mr-1" /> {c.xp_value} XP
                        </div>
                      </div>
                      
                      <h3 className="font-display font-bold text-xl text-forest-900 dark:text-ivory mb-2 line-clamp-1 relative z-10">{c.title}</h3>
                      <p className="text-sm text-sage-600 dark:text-sage-400 mb-6 line-clamp-2 relative z-10">{c.description}</p>
                      
                      <div className="mt-auto relative z-10">
                        <div className="flex justify-between text-xs text-sage-500 font-medium mb-4">
                          <span>Difficulty: {c.difficulty}</span>
                          <span>Deadline: {new Date(c.deadline).toLocaleDateString()}</span>
                        </div>
                        <button 
                          onClick={() => { setSelectedChallengeId(c.id); setIsJoinModalOpen(true); }}
                          disabled={isJoined || (c.seasonal && daysLeftText === 'Ended')}
                          className={`w-full py-2.5 font-semibold rounded-xl transition-colors shadow-sm ${isJoined || (c.seasonal && daysLeftText === 'Ended') ? 'bg-sage-100 text-sage-500 dark:bg-ash-800' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-900/20'}`}
                        >
                          {isJoined ? 'Already Joined' : c.seasonal && daysLeftText === 'Ended' ? 'Challenge Ended' : 'Accept Challenge'}
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="overflow-x-auto">
            <div className="p-6 border-b border-sage-100 dark:border-ash-800 bg-ivory dark:bg-ash-900/50">
              <h3 className="text-xl font-display font-bold text-forest-900 dark:text-ivory">Global Leaderboard</h3>
            </div>
            <table className="w-full text-left text-sm text-sage-600 dark:text-sage-400">
              <thead className="bg-sage-50/50 dark:bg-ash-800/20 text-xs font-bold uppercase tracking-widest text-sage-500 border-b border-sage-100 dark:border-ash-800">
                <tr>
                  <th className="px-6 py-4 w-24 text-center">Rank</th>
                  <th className="px-6 py-4">Employee ID</th>
                  <th className="px-6 py-4 text-center">Streak</th>
                  <th className="px-6 py-4 text-right">Lifetime XP</th>
                  <th className="px-6 py-4 text-right">Available Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((w, index) => (
                  <tr key={w.employee_id} className={`border-b border-sage-100 dark:border-ash-800 hover:bg-sage-50 dark:hover:bg-ash-800/50 transition-colors ${index < 3 ? 'bg-indigo-50/30 dark:bg-indigo-900/10' : ''}`}>
                    <td className="px-6 py-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto font-display font-bold text-sm ${index === 0 ? 'bg-amber-100 text-amber-700' : index === 1 ? 'bg-slate-200 text-slate-700' : index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-sage-100 text-sage-600 dark:bg-ash-800 dark:text-sage-400'}`}>
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-forest-900 dark:text-ivory flex items-center gap-2">
                      {w.employee_id} {w.employee_id === currentEmployeeId && <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-[10px] uppercase font-bold">You</span>}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center text-orange-500 font-bold">
                        {w.streak_count > 0 ? <><Flame className="w-4 h-4 mr-1" fill="currentColor" /> {w.streak_count}</> : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-indigo-600 dark:text-indigo-400">{w.lifetime_earned.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">{w.balance.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'kudos' && (
          <div className="overflow-x-auto">
            <div className="p-6 border-b border-sage-100 dark:border-ash-800 flex justify-between items-center bg-ivory dark:bg-ash-900/50">
              <h3 className="text-xl font-display font-bold text-forest-900 dark:text-ivory">Company Kudos</h3>
              <button 
                onClick={() => setIsKudosModalOpen(true)}
                className="flex items-center px-4 py-2 bg-pink-600 text-white hover:bg-pink-700 rounded-xl text-sm font-medium transition-colors shadow-sm"
              >
                <Heart className="w-4 h-4 mr-2" fill="currentColor" /> Send Kudos
              </button>
            </div>
            <div className="p-8 max-w-3xl mx-auto space-y-6">
              {kudosList.length === 0 ? (
                <div className="text-center py-12 text-sage-400">
                  <Heart className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p>No kudos sent yet. Be the first to recognize a peer!</p>
                </div>
              ) : (
                kudosList.map(k => (
                  <div key={k.id} className="bg-white dark:bg-ash-950 border border-sage-200 dark:border-ash-800 p-6 rounded-3xl shadow-sm flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-pink-50 dark:bg-pink-900/30 text-pink-500 flex items-center justify-center shrink-0">
                      <Heart className="w-6 h-6" fill="currentColor" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="font-bold text-forest-900 dark:text-ivory">{k.sender_id}</span>
                        <span className="text-sage-500 text-sm">awarded</span>
                        <span className="font-bold text-pink-600 dark:text-pink-400">{k.points} XP</span>
                        <span className="text-sage-500 text-sm">to</span>
                        <span className="font-bold text-forest-900 dark:text-ivory">{k.receiver_id}</span>
                      </div>
                      <p className="text-sage-700 dark:text-sage-300 text-lg leading-relaxed">
                        "{k.message}"
                      </p>
                      <p className="text-xs text-sage-400 mt-3 font-medium">
                        {new Date(k.sent_date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <Modal isOpen={isChallengeModalOpen} onClose={() => setIsChallengeModalOpen(false)} title="Create Challenge">
        <form onSubmit={handleCreateChallenge} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Title</label>
            <input type="text" required value={challengeForm.title} onChange={e => setChallengeForm({...challengeForm, title: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-indigo-500 outline-none" placeholder="e.g., Bike to Work Month" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Category</label>
              <select required value={challengeForm.category_id} onChange={e => setChallengeForm({...challengeForm, category_id: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-indigo-500 outline-none">
                <option value="">Select a category...</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">XP Reward</label>
              <input type="number" required value={challengeForm.xp_value} onChange={e => setChallengeForm({...challengeForm, xp_value: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-indigo-500 outline-none" placeholder="e.g., 500" />
            </div>
          </div>
          
          {/* Toggles */}
          <div className="flex gap-8 py-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={challengeForm.team_based} onChange={e => setChallengeForm({...challengeForm, team_based: e.target.checked})} className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500" />
              <span className="text-sm font-medium text-forest-900 dark:text-ivory">Team Based Challenge</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={challengeForm.seasonal} onChange={e => setChallengeForm({...challengeForm, seasonal: e.target.checked})} className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500" />
              <span className="text-sm font-medium text-forest-900 dark:text-ivory">Seasonal / Limited Time</span>
            </label>
          </div>

          {/* Seasonal Dates */}
          {challengeForm.seasonal && (
            <div className="grid grid-cols-2 gap-4 bg-sage-50 dark:bg-ash-950 p-4 rounded-xl border border-sage-200 dark:border-ash-800">
              <div>
                <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Start Date</label>
                <input type="date" required={challengeForm.seasonal} value={challengeForm.event_start_date} onChange={e => setChallengeForm({...challengeForm, event_start_date: e.target.value})} className="w-full p-2.5 bg-white dark:bg-ash-900 border border-sage-200 dark:border-ash-800 rounded-lg outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">End Date</label>
                <input type="date" required={challengeForm.seasonal} value={challengeForm.event_end_date} onChange={e => setChallengeForm({...challengeForm, event_end_date: e.target.value})} className="w-full p-2.5 bg-white dark:bg-ash-900 border border-sage-200 dark:border-ash-800 rounded-lg outline-none text-sm" />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Difficulty</label>
              <select required value={challengeForm.difficulty} onChange={e => setChallengeForm({...challengeForm, difficulty: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-indigo-500 outline-none">
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Deadline (Global)</label>
              <input type="date" required value={challengeForm.deadline} onChange={e => setChallengeForm({...challengeForm, deadline: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-indigo-500 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Description</label>
            <textarea required rows={3} value={challengeForm.description} onChange={e => setChallengeForm({...challengeForm, description: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-indigo-500 outline-none" placeholder="Challenge rules..." />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsChallengeModalOpen(false)} className="px-5 py-2.5 text-sage-600 dark:text-sage-400 font-medium hover:bg-sage-100 dark:hover:bg-ash-800 rounded-xl transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 shadow-sm shadow-indigo-900/20">{isSubmitting ? 'Saving...' : 'Create Challenge'}</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} title="Join Challenge">
        <form onSubmit={handleJoinChallenge} className="space-y-4">
          <p className="text-sage-600 dark:text-sage-400 mb-6">
            Are you sure you want to accept this challenge? 
            Once completed, you will earn XP and move up the leaderboard!
          </p>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsJoinModalOpen(false)} className="px-5 py-2.5 text-sage-600 dark:text-sage-400 font-medium hover:bg-sage-100 dark:hover:bg-ash-800 rounded-xl transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 shadow-sm shadow-indigo-900/20">{isSubmitting ? 'Joining...' : 'Yes, Accept Challenge'}</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isKudosModalOpen} onClose={() => setIsKudosModalOpen(false)} title="Send Kudos">
        <form onSubmit={handleSendKudos} className="space-y-4">
          <p className="text-sage-600 dark:text-sage-400 text-sm mb-4">
            Recognize a peer for their ESG efforts! Sending kudos awards them 50 XP. (Limit: 5 sends per month).
          </p>
          <div>
            <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Colleague's Employee ID</label>
            <input type="text" required value={kudosForm.receiver_id} onChange={e => setKudosForm({...kudosForm, receiver_id: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-pink-500 outline-none" placeholder="e.g., emp-102" />
          </div>
          <div>
            <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Message</label>
            <textarea required rows={3} maxLength={150} value={kudosForm.message} onChange={e => setKudosForm({...kudosForm, message: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-pink-500 outline-none" placeholder="Thanks for leading the recycling initiative! (max 150 chars)" />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsKudosModalOpen(false)} className="px-5 py-2.5 text-sage-600 dark:text-sage-400 font-medium hover:bg-sage-100 dark:hover:bg-ash-800 rounded-xl transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 bg-pink-600 text-white font-medium rounded-xl hover:bg-pink-700 transition-colors disabled:opacity-50 shadow-sm shadow-pink-900/20">{isSubmitting ? 'Sending...' : 'Send Kudos'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
