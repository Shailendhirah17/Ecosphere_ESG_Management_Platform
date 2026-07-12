import React, { useEffect, useState } from 'react';
import { Users, Plus, Edit2, Trash2, Calendar, MapPin, CheckCircle, Database } from 'lucide-react';
import Modal from '../components/Modal';

export default function Social() {
  const [activeTab, setActiveTab] = useState<'activities' | 'registrations'>('activities');

  // Data States
  const [activities, setActivities] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [participations, setParticipations] = useState<any[]>([]);

  // Modal States
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState<string>('');

  // Form States
  const [activityForm, setActivityForm] = useState({
    title: '', category_id: '', description: '', department_id: '',
    location: '', start_date: new Date().toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0], capacity: ''
  });

  const fetchData = () => {
    fetch('http://localhost:3000/csr-activities').then(r => r.json()).then(setActivities).catch(console.error);
    fetch('http://localhost:3000/departments').then(r => r.json()).then(setDepartments).catch(console.error);
    fetch('http://localhost:3000/categories').then(r => r.json()).then(data => setCategories(data.filter((c:any) => c.type === 'CSR_ACTIVITY'))).catch(console.error);
    fetch('http://localhost:3000/employee-participations').then(r => r.json()).then(setParticipations).catch(console.error);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:3000/csr-activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...activityForm,
          capacity: parseInt(activityForm.capacity),
          start_date: new Date(activityForm.start_date).toISOString(),
          end_date: new Date(activityForm.end_date).toISOString(),
          status: 'Active'
        })
      });
      if (res.ok) {
        setIsActivityModalOpen(false);
        setActivityForm({
          title: '', category_id: '', description: '', department_id: '',
          location: '', start_date: new Date().toISOString().split('T')[0],
          end_date: new Date().toISOString().split('T')[0], capacity: ''
        });
        fetchData();
      } else {
        alert('Failed to add activity');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:3000/employee-participations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activity_id: selectedActivityId,
          employee_id: 'emp-demo', // Mock employee
          approval_status: 'Pending',
          points_earned: 0
        })
      });
      if (res.ok) {
        setIsRegisterModalOpen(false);
        setSelectedActivityId('');
        fetchData();
      } else {
        alert('Failed to register');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryName = (id: string) => categories.find(c => c.id === id)?.name || id;
  const getDepartmentName = (id: string) => departments.find(d => d.id === id)?.name || id;
  const getActivityName = (id: string) => activities.find(a => a.id === id)?.title || id;

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-forest-900 dark:text-ivory tracking-tight mb-2 flex items-center gap-3">
            <div className="p-3 bg-bio-500/10 rounded-2xl text-bio-500">
              <Users className="w-8 h-8" />
            </div>
            Social (CSR) Module
          </h1>
          <p className="text-sage-500">
            Manage Corporate Social Responsibility initiatives and employee volunteering.
          </p>
        </div>
      </div>

      <div className="flex space-x-1 bg-sage-100 dark:bg-ash-800 p-1.5 rounded-2xl w-fit mb-8 shadow-sm">
        <button
          onClick={() => setActiveTab('activities')}
          className={`flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeTab === 'activities' ? 'bg-white dark:bg-ash-900 text-bio-700 dark:text-bio-400 shadow-sm' : 'text-sage-600 dark:text-sage-400 hover:bg-white/50 dark:hover:bg-ash-900/50'}`}
        >
          <Calendar className="w-4 h-4 mr-2" />
          CSR Activities
        </button>
        <button
          onClick={() => setActiveTab('registrations')}
          className={`flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeTab === 'registrations' ? 'bg-white dark:bg-ash-900 text-bio-700 dark:text-bio-400 shadow-sm' : 'text-sage-600 dark:text-sage-400 hover:bg-white/50 dark:hover:bg-ash-900/50'}`}
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Registrations
        </button>
      </div>

      <div className="bg-white dark:bg-ash-900 rounded-3xl border border-sage-100 dark:border-ash-800 shadow-sm overflow-hidden min-h-[400px]">
        {activeTab === 'activities' && (
          <div className="overflow-x-auto">
            <div className="p-6 border-b border-sage-100 dark:border-ash-800 flex justify-between items-center bg-ivory dark:bg-ash-900/50">
              <h3 className="text-xl font-display font-bold text-forest-900 dark:text-ivory">Active Initiatives</h3>
              <button 
                onClick={() => setIsActivityModalOpen(true)}
                className="flex items-center px-4 py-2 bg-bio-600 text-white hover:bg-bio-700 rounded-xl text-sm font-medium transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 mr-1" /> New Activity
              </button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.length === 0 ? (
                <div className="col-span-full py-12 flex flex-col items-center justify-center text-sage-400">
                  <Database className="w-12 h-12 mb-4 opacity-50" />
                  <p>No CSR activities found. Create one to get started.</p>
                </div>
              ) : (
                activities.map(act => {
                  const regCount = participations.filter(p => p.activity_id === act.id).length;
                  return (
                    <div key={act.id} className="border border-sage-200 dark:border-ash-800 rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col bg-white dark:bg-ash-900">
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider bg-bio-50 text-bio-700 dark:bg-bio-900/30 dark:text-bio-400 rounded-lg">
                          {getCategoryName(act.category_id)}
                        </span>
                        <span className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-lg ${act.status === 'Active' ? 'bg-forest-50 text-forest-700 dark:bg-forest-900/30 dark:text-forest-400' : 'bg-sage-100 text-sage-600'}`}>
                          {act.status}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-xl text-forest-900 dark:text-ivory mb-2 line-clamp-1">{act.title}</h3>
                      <p className="text-sm text-sage-600 dark:text-sage-400 mb-4 line-clamp-2">{act.description}</p>
                      
                      <div className="space-y-2 mt-auto mb-6 text-sm text-sage-600 dark:text-sage-400">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 opacity-70" />
                          {new Date(act.start_date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 opacity-70" />
                          {act.location}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2 opacity-70" />
                          {regCount} / {act.capacity} Registered
                        </div>
                      </div>

                      <button 
                        onClick={() => { setSelectedActivityId(act.id); setIsRegisterModalOpen(true); }}
                        disabled={regCount >= act.capacity}
                        className="w-full py-2.5 bg-bio-50 dark:bg-bio-900/20 text-bio-700 dark:text-bio-400 font-semibold rounded-xl hover:bg-bio-100 dark:hover:bg-bio-900/40 transition-colors disabled:opacity-50"
                      >
                        {regCount >= act.capacity ? 'Full' : 'Register Now'}
                      </button>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}

        {activeTab === 'registrations' && (
          <div className="overflow-x-auto">
            <div className="p-6 border-b border-sage-100 dark:border-ash-800 bg-ivory dark:bg-ash-900/50">
              <h3 className="text-xl font-display font-bold text-forest-900 dark:text-ivory">Employee Participation</h3>
            </div>
            <table className="w-full text-left text-sm text-sage-600 dark:text-sage-400">
              <thead className="bg-sage-50/50 dark:bg-ash-800/20 text-xs font-bold uppercase tracking-widest text-sage-500 border-b border-sage-100 dark:border-ash-800">
                <tr>
                  <th className="px-6 py-4">Employee ID</th>
                  <th className="px-6 py-4">Activity</th>
                  <th className="px-6 py-4">Points Earned</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {participations.length === 0 ? (
                   <tr>
                   <td colSpan={4} className="px-6 py-16 text-center text-sage-400">
                     No registrations found.
                   </td>
                 </tr>
                ) : participations.map(p => (
                  <tr key={p.id} className="border-b border-sage-100 dark:border-ash-800 hover:bg-sage-50 dark:hover:bg-ash-800/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">{p.employee_id}</td>
                    <td className="px-6 py-4 font-medium text-forest-900 dark:text-ivory">{getActivityName(p.activity_id)}</td>
                    <td className="px-6 py-4 font-semibold text-bio-600 dark:text-bio-400">+{p.points_earned}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-lg ${p.approval_status === 'Approved' ? 'bg-forest-50 text-forest-700' : 'bg-amber-50 text-amber-700'}`}>
                        {p.approval_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      <Modal isOpen={isActivityModalOpen} onClose={() => setIsActivityModalOpen(false)} title="New CSR Activity">
        <form onSubmit={handleAddActivity} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Title</label>
            <input type="text" required value={activityForm.title} onChange={e => setActivityForm({...activityForm, title: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-bio-500 outline-none" placeholder="e.g., Beach Cleanup" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Category</label>
              <select required value={activityForm.category_id} onChange={e => setActivityForm({...activityForm, category_id: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-bio-500 outline-none">
                <option value="">Select a category...</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Department</label>
              <select required value={activityForm.department_id} onChange={e => setActivityForm({...activityForm, department_id: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-bio-500 outline-none">
                <option value="">Select a department...</option>
                {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Location</label>
            <input type="text" required value={activityForm.location} onChange={e => setActivityForm({...activityForm, location: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-bio-500 outline-none" placeholder="e.g., Santa Monica Pier" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Start Date</label>
              <input type="date" required value={activityForm.start_date} onChange={e => setActivityForm({...activityForm, start_date: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-bio-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Capacity</label>
              <input type="number" required value={activityForm.capacity} onChange={e => setActivityForm({...activityForm, capacity: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-bio-500 outline-none" placeholder="e.g., 50" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Description</label>
            <textarea required rows={3} value={activityForm.description} onChange={e => setActivityForm({...activityForm, description: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-bio-500 outline-none" placeholder="Activity details..." />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsActivityModalOpen(false)} className="px-5 py-2.5 text-sage-600 dark:text-sage-400 font-medium hover:bg-sage-100 dark:hover:bg-ash-800 rounded-xl transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 bg-bio-600 text-white font-medium rounded-xl hover:bg-bio-700 transition-colors disabled:opacity-50 shadow-sm shadow-bio-900/20">{isSubmitting ? 'Saving...' : 'Create Activity'}</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} title="Confirm Registration">
        <form onSubmit={handleRegister} className="space-y-4">
          <p className="text-sage-600 dark:text-sage-400 mb-6">
            You are registering for <strong>{getActivityName(selectedActivityId)}</strong>. 
            Once registered, you can upload proof of participation to earn points.
          </p>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsRegisterModalOpen(false)} className="px-5 py-2.5 text-sage-600 dark:text-sage-400 font-medium hover:bg-sage-100 dark:hover:bg-ash-800 rounded-xl transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 bg-bio-600 text-white font-medium rounded-xl hover:bg-bio-700 transition-colors disabled:opacity-50 shadow-sm shadow-bio-900/20">{isSubmitting ? 'Registering...' : 'Confirm Registration'}</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
