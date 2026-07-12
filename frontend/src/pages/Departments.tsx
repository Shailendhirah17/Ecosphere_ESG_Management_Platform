import React, { useEffect, useState } from 'react';
import { Building2, Plus, Edit2, Trash2, TrendingUp, TrendingDown, Minus, Award, List } from 'lucide-react';
import Modal from '../components/Modal';

export default function Departments() {
  const [activeTab, setActiveTab] = useState<'directory' | 'rankings'>('directory');
  const [departments, setDepartments] = useState<any[]>([]);
  const [scores, setScores] = useState<any[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', code: '', head_employee_id: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      const [deptRes, scoreRes] = await Promise.all([
        fetch('http://localhost:3000/departments'),
        fetch('http://localhost:3000/department-scores')
      ]);
      setDepartments(await deptRes.json());
      setScores(await scoreRes.json());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:3000/departments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          employee_count: 0,
          status: 'ACTIVE'
        })
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ name: '', code: '', head_employee_id: '' });
        fetchData();
      } else {
        alert('Failed to create department');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Combine and sort rankings
  const rankings = departments.map(d => {
    const s = scores.find(score => score.department_id === d.id);
    return {
      ...d,
      total_score: s ? s.total_score : 0,
      env: s ? s.environmental_score : 0,
      soc: s ? s.social_score : 0,
      gov: s ? s.governance_score : 0
    };
  }).sort((a, b) => b.total_score - a.total_score);

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-forest-900 dark:text-ivory tracking-tight mb-2 flex items-center gap-3">
            <div className="p-3 bg-forest-500/10 rounded-2xl text-forest-500">
              <Building2 className="w-8 h-8" />
            </div>
            Master Data: Departments
          </h1>
          <p className="text-sage-500">
            Manage your organizational hierarchy and department metadata.
          </p>
        </div>
      </div>

      <div className="flex space-x-1 bg-sage-100 dark:bg-ash-800 p-1.5 rounded-2xl w-fit mb-8 shadow-sm">
        <button
          onClick={() => setActiveTab('directory')}
          className={`flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeTab === 'directory' ? 'bg-white dark:bg-ash-900 text-forest-700 dark:text-forest-400 shadow-sm' : 'text-sage-600 dark:text-sage-400 hover:bg-white/50 dark:hover:bg-ash-900/50'}`}
        >
          <List className="w-4 h-4 mr-2" />
          Directory
        </button>
        <button
          onClick={() => setActiveTab('rankings')}
          className={`flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeTab === 'rankings' ? 'bg-white dark:bg-ash-900 text-forest-700 dark:text-forest-400 shadow-sm' : 'text-sage-600 dark:text-sage-400 hover:bg-white/50 dark:hover:bg-ash-900/50'}`}
        >
          <Award className="w-4 h-4 mr-2" />
          ESG Rankings
        </button>
      </div>

      <div className="bg-white dark:bg-ash-900 rounded-3xl border border-sage-100 dark:border-ash-800 shadow-sm overflow-hidden min-h-[400px]">
        
        {activeTab === 'directory' && (
          <div className="overflow-x-auto">
            <div className="p-6 border-b border-sage-100 dark:border-ash-800 flex justify-between items-center bg-ivory dark:bg-ash-900/50">
              <h3 className="text-xl font-display font-bold text-forest-900 dark:text-ivory">Departments</h3>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center px-4 py-2 bg-forest-900 text-ivory hover:bg-forest-800 rounded-xl text-sm font-medium transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Department
              </button>
            </div>
            <table className="w-full text-left text-sm text-sage-600 dark:text-sage-400">
              <thead className="bg-sage-50/50 dark:bg-ash-800/20 text-xs font-bold uppercase tracking-widest text-sage-500 border-b border-sage-100 dark:border-ash-800">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Head Employee ID</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Building2 className="w-12 h-12 text-sage-300 mb-4" />
                        <h4 className="text-lg font-display font-bold text-forest-900 dark:text-ivory mb-1">No departments found</h4>
                        <p className="text-sage-500 text-sm">Add your first department to get started.</p>
                      </div>
                    </td>
                  </tr>
                ) : departments.map(d => (
                  <tr key={d.id} className="border-b border-sage-100 dark:border-ash-800 hover:bg-sage-50 dark:hover:bg-ash-800/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">{d.id}</td>
                    <td className="px-6 py-4 font-semibold text-forest-900 dark:text-ivory">{d.name}</td>
                    <td className="px-6 py-4 font-mono text-xs text-sage-500">{d.head_employee_id || 'N/A'}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-sage-400 hover:text-forest-600 hover:bg-forest-50 dark:hover:bg-forest-900/30 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-sage-400 hover:text-status-critical hover:bg-status-critical/10 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'rankings' && (
          <div className="overflow-x-auto">
            <div className="p-6 border-b border-sage-100 dark:border-ash-800 flex justify-between items-center bg-ivory dark:bg-ash-900/50">
              <h3 className="text-xl font-display font-bold text-forest-900 dark:text-ivory">Department ESG Rankings</h3>
            </div>
            <table className="w-full text-left text-sm text-sage-600 dark:text-sage-400">
              <thead className="bg-sage-50/50 dark:bg-ash-800/20 text-xs font-bold uppercase tracking-widest text-sage-500 border-b border-sage-100 dark:border-ash-800">
                <tr>
                  <th className="px-6 py-4 w-16 text-center">Rank</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4 text-center">Env Score</th>
                  <th className="px-6 py-4 text-center">Soc Score</th>
                  <th className="px-6 py-4 text-center">Gov Score</th>
                  <th className="px-6 py-4 text-right font-display text-sm">Total Score</th>
                  <th className="px-6 py-4 w-16 text-center">Trend</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((dept, index) => (
                  <tr key={dept.id} className={`border-b border-sage-100 dark:border-ash-800 hover:bg-sage-50 dark:hover:bg-ash-800/50 transition-colors cursor-pointer ${index === 0 ? 'bg-amber-50/30 dark:bg-amber-900/10' : ''}`}>
                    <td className="px-6 py-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto font-display font-bold text-sm ${index === 0 ? 'bg-amber-100 text-amber-700' : index === 1 ? 'bg-slate-200 text-slate-700' : index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-sage-100 text-sage-600 dark:bg-ash-800 dark:text-sage-400'}`}>
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-forest-900 dark:text-ivory">{dept.name}</td>
                    <td className="px-6 py-4 text-center font-medium text-bio-600">{dept.env.toFixed(1)}</td>
                    <td className="px-6 py-4 text-center font-medium text-indigo-600">{dept.soc.toFixed(1)}</td>
                    <td className="px-6 py-4 text-center font-medium text-amber-600">{dept.gov.toFixed(1)}</td>
                    <td className="px-6 py-4 text-right font-display font-bold text-forest-900 dark:text-ivory text-lg">
                      {dept.total_score.toFixed(1)}
                    </td>
                    <td className="px-6 py-4">
                      {index % 3 === 0 ? (
                        <TrendingUp className="w-5 h-5 text-forest-500 mx-auto" />
                      ) : index % 3 === 1 ? (
                        <Minus className="w-5 h-5 text-sage-400 mx-auto" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-status-warning mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Department">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Department Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-forest-500 focus:border-forest-500 dark:text-ivory outline-none"
              placeholder="e.g., Finance"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Department Code</label>
            <input 
              type="text" 
              required
              value={formData.code}
              onChange={e => setFormData({...formData, code: e.target.value})}
              className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-forest-500 focus:border-forest-500 dark:text-ivory outline-none"
              placeholder="e.g., FIN-01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Head Employee ID (Optional)</label>
            <input 
              type="text" 
              value={formData.head_employee_id}
              onChange={e => setFormData({...formData, head_employee_id: e.target.value})}
              className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-forest-500 focus:border-forest-500 dark:text-ivory outline-none"
              placeholder="e.g., emp-105"
            />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2.5 text-sage-600 dark:text-sage-400 font-medium hover:bg-sage-100 dark:hover:bg-ash-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-forest-900 text-ivory font-medium rounded-xl hover:bg-forest-800 transition-colors disabled:opacity-50 shadow-sm shadow-forest-900/20"
            >
              {isSubmitting ? 'Saving...' : 'Save Department'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
