import React, { useEffect, useState } from 'react';
import { Leaf, Plus, Edit2, Trash2, Filter, Search, BarChart3, Database, Target } from 'lucide-react';
import Modal from '../components/Modal';

export default function Environmental() {
  const [activeTab, setActiveTab] = useState<'factors' | 'transactions' | 'goals'>('transactions');
  
  // Data States
  const [factors, setFactors] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);

  // Modal States
  const [isEmissionModalOpen, setIsEmissionModalOpen] = useState(false);
  const [isFactorModalOpen, setIsFactorModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form States
  const [emissionForm, setEmissionForm] = useState({ department_id: '', emission_factor_id: '', source_type: 'Facility', source_record_id: '', quantity: '' });
  const [factorForm, setFactorForm] = useState({ name: '', activity_type: 'Facility', unit: '', co2e_per_unit: '', source: '', effective_from: new Date().toISOString().split('T')[0] });
  const [goalForm, setGoalForm] = useState({ metric_type: 'Carbon Reduction', target_value: '', unit: '', target_date: new Date().toISOString().split('T')[0], baseline_value: '' });

  const fetchData = () => {
    fetch('http://localhost:3000/emission-factors').then(r => r.json()).then(setFactors).catch(console.error);
    fetch('http://localhost:3000/carbon-transactions').then(r => r.json()).then(setTransactions).catch(console.error);
    fetch('http://localhost:3000/environmental-goals').then(r => r.json()).then(setGoals).catch(console.error);
    fetch('http://localhost:3000/departments').then(r => r.json()).then(setDepartments).catch(console.error);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogEmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const selectedFactor = factors.find(f => f.id === emissionForm.emission_factor_id);
      const quantityNum = parseFloat(emissionForm.quantity);
      const co2e = selectedFactor ? quantityNum * selectedFactor.co2e_per_unit : 0;
      
      const res = await fetch('http://localhost:3000/carbon-transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...emissionForm,
          quantity: quantityNum,
          calculated_co2e: co2e,
          calculation_mode: 'Auto',
          transaction_date: new Date().toISOString(),
          created_by: 'user'
        })
      });
      if (res.ok) {
        setIsEmissionModalOpen(false);
        setEmissionForm({ department_id: '', emission_factor_id: '', source_type: 'Facility', source_record_id: '', quantity: '' });
        fetchData();
      } else {
        alert('Failed to log emission');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddFactor = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:3000/emission-factors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...factorForm,
          co2e_per_unit: parseFloat(factorForm.co2e_per_unit),
          effective_from: new Date(factorForm.effective_from).toISOString(),
          status: 'ACTIVE'
        })
      });
      if (res.ok) {
        setIsFactorModalOpen(false);
        setFactorForm({ name: '', activity_type: 'Facility', unit: '', co2e_per_unit: '', source: '', effective_from: new Date().toISOString().split('T')[0] });
        fetchData();
      } else {
        alert('Failed to add factor');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:3000/environmental-goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...goalForm,
          target_value: parseFloat(goalForm.target_value),
          baseline_value: parseFloat(goalForm.baseline_value),
          target_date: new Date(goalForm.target_date).toISOString(),
          status: 'ACTIVE'
        })
      });
      if (res.ok) {
        setIsGoalModalOpen(false);
        setGoalForm({ metric_type: 'Carbon Reduction', target_value: '', unit: '', target_date: new Date().toISOString().split('T')[0], baseline_value: '' });
        fetchData();
      } else {
        alert('Failed to add goal');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-forest-900 dark:text-ivory tracking-tight mb-2 flex items-center gap-3">
            <div className="p-3 bg-forest-500/10 rounded-2xl text-forest-500">
              <Leaf className="w-8 h-8" />
            </div>
            Environmental Module
          </h1>
          <p className="text-sage-500">
            Track carbon emissions, manage emission factors, and set reduction goals.
          </p>
        </div>
      </div>

      <div className="flex space-x-1 bg-sage-100 dark:bg-ash-800 p-1.5 rounded-2xl w-fit mb-8 shadow-sm">
        <button
          onClick={() => setActiveTab('transactions')}
          className={`flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeTab === 'transactions' ? 'bg-white dark:bg-ash-900 text-forest-900 dark:text-ivory shadow-sm' : 'text-sage-600 dark:text-sage-400 hover:bg-white/50 dark:hover:bg-ash-900/50'}`}
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          Carbon Transactions
        </button>
        <button
          onClick={() => setActiveTab('factors')}
          className={`flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeTab === 'factors' ? 'bg-white dark:bg-ash-900 text-forest-900 dark:text-ivory shadow-sm' : 'text-sage-600 dark:text-sage-400 hover:bg-white/50 dark:hover:bg-ash-900/50'}`}
        >
          <Database className="w-4 h-4 mr-2" />
          Emission Factors
        </button>
        <button
          onClick={() => setActiveTab('goals')}
          className={`flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeTab === 'goals' ? 'bg-white dark:bg-ash-900 text-forest-900 dark:text-ivory shadow-sm' : 'text-sage-600 dark:text-sage-400 hover:bg-white/50 dark:hover:bg-ash-900/50'}`}
        >
          <Target className="w-4 h-4 mr-2" />
          Reduction Goals
        </button>
      </div>

      <div className="bg-white dark:bg-ash-900 rounded-3xl border border-sage-100 dark:border-ash-800 shadow-sm overflow-hidden min-h-[400px]">
        {activeTab === 'transactions' && (
          <div className="overflow-x-auto">
            <div className="p-6 border-b border-sage-100 dark:border-ash-800 flex justify-between items-center bg-ivory dark:bg-ash-900/50">
              <h3 className="text-xl font-display font-bold text-forest-900 dark:text-ivory">Emissions Ledger</h3>
              <div className="flex gap-2">
                <button className="flex items-center px-4 py-2 border border-sage-200 dark:border-ash-800 text-sage-600 dark:text-sage-400 hover:bg-sage-50 dark:hover:bg-ash-800 rounded-xl text-sm font-medium transition-colors">
                  <Filter className="w-4 h-4 mr-1" /> Filter
                </button>
                <button 
                  onClick={() => setIsEmissionModalOpen(true)}
                  className="flex items-center px-4 py-2 bg-forest-900 text-ivory hover:bg-forest-800 rounded-xl text-sm font-medium transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4 mr-1" /> Log Emission
                </button>
              </div>
            </div>
            <table className="w-full text-left text-sm text-sage-600 dark:text-sage-400">
              <thead className="bg-sage-50/50 dark:bg-ash-800/20 text-xs font-bold uppercase tracking-widest text-sage-500 border-b border-sage-100 dark:border-ash-800">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Source Type</th>
                  <th className="px-6 py-4 text-right">Quantity</th>
                  <th className="px-6 py-4 text-right">tCO2e</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <BarChart3 className="w-12 h-12 text-sage-300 mb-4" />
                        <h4 className="text-lg font-display font-bold text-forest-900 dark:text-ivory mb-1">No transactions found</h4>
                        <p className="text-sage-500 text-sm">Start logging emissions to build your ledger.</p>
                      </div>
                    </td>
                  </tr>
                ) : transactions.map(t => (
                  <tr key={t.id} className="border-b border-sage-100 dark:border-ash-800 hover:bg-sage-50 dark:hover:bg-ash-800/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">{t.id}</td>
                    <td className="px-6 py-4 font-medium text-forest-900 dark:text-ivory">
                      {departments.find(d => d.id === t.department_id)?.name || t.department_id}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider bg-sage-100 text-sage-700 dark:bg-ash-800 dark:text-sage-400 rounded-lg">
                        {t.source_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">{t.quantity}</td>
                    <td className="px-6 py-4 text-right font-bold text-forest-600 dark:text-forest-400">{t.calculated_co2e.toFixed(2)}</td>
                    <td className="px-6 py-4">{new Date(t.transaction_date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'factors' && (
          <div className="overflow-x-auto">
            <div className="p-6 border-b border-sage-100 dark:border-ash-800 flex justify-between items-center bg-ivory dark:bg-ash-900/50">
              <h3 className="text-xl font-display font-bold text-forest-900 dark:text-ivory">Emission Factors Library</h3>
              <button 
                onClick={() => setIsFactorModalOpen(true)}
                className="flex items-center px-4 py-2 bg-forest-900 text-ivory hover:bg-forest-800 rounded-xl text-sm font-medium transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Factor
              </button>
            </div>
            <table className="w-full text-left text-sm text-sage-600 dark:text-sage-400">
              <thead className="bg-sage-50/50 dark:bg-ash-800/20 text-xs font-bold uppercase tracking-widest text-sage-500 border-b border-sage-100 dark:border-ash-800">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Activity Type</th>
                  <th className="px-6 py-4">Source</th>
                  <th className="px-6 py-4 text-right">Value (kgCO2e/unit)</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {factors.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Database className="w-12 h-12 text-sage-300 mb-4" />
                        <h4 className="text-lg font-display font-bold text-forest-900 dark:text-ivory mb-1">No emission factors found</h4>
                        <p className="text-sage-500 text-sm">Add standard factors to enable auto-calculations.</p>
                      </div>
                    </td>
                  </tr>
                ) : factors.map(f => (
                  <tr key={f.id} className="border-b border-sage-100 dark:border-ash-800 hover:bg-sage-50 dark:hover:bg-ash-800/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-forest-900 dark:text-ivory">{f.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider bg-sage-100 text-sage-700 dark:bg-ash-800 dark:text-sage-400 rounded-lg">
                        {f.activity_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sage-500 line-clamp-1">{f.source}</td>
                    <td className="px-6 py-4 text-right font-mono text-sm">{f.co2e_per_unit} {f.unit}</td>
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

        {activeTab === 'goals' && (
          <div className="p-6">
            <h3 className="text-xl font-display font-bold text-forest-900 dark:text-ivory mb-6">Carbon Reduction Goals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.map(g => (
                <div key={g.id} className="border border-sage-200 dark:border-ash-800 rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-display font-bold text-xl text-forest-900 dark:text-ivory">{g.metric_type}</h3>
                    <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider bg-forest-50 text-forest-700 dark:bg-forest-900/30 dark:text-forest-400 rounded-lg">
                      {g.status}
                    </span>
                  </div>
                  <p className="text-sm text-sage-600 dark:text-sage-400 mb-6">Target: {g.target_value} {g.unit} by {new Date(g.target_date).getFullYear()}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-sage-600 dark:text-sage-400">Baseline: {g.baseline_value}</span>
                    </div>
                  </div>
                </div>
              ))}

              <div 
                onClick={() => setIsGoalModalOpen(true)}
                className="border border-sage-200 dark:border-ash-800 border-dashed rounded-3xl p-6 flex flex-col items-center justify-center text-sage-500 hover:bg-sage-50 dark:hover:bg-ash-800/50 cursor-pointer transition-colors group min-h-[200px]"
              >
                <div className="p-4 bg-sage-100 dark:bg-ash-800 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                  <Plus className="w-8 h-8 text-forest-600 dark:text-forest-400" />
                </div>
                <h4 className="text-lg font-display font-bold text-forest-900 dark:text-ivory mb-1">Add New Goal</h4>
                <p className="text-sm">Define a new reduction target</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <Modal isOpen={isEmissionModalOpen} onClose={() => setIsEmissionModalOpen(false)} title="Log Emission">
        <form onSubmit={handleLogEmission} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Department</label>
            <select 
              required
              value={emissionForm.department_id}
              onChange={e => setEmissionForm({...emissionForm, department_id: e.target.value})}
              className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-forest-500 focus:border-forest-500 dark:text-ivory outline-none"
            >
              <option value="">Select a department...</option>
              {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Emission Factor</label>
            <select 
              required
              value={emissionForm.emission_factor_id}
              onChange={e => setEmissionForm({...emissionForm, emission_factor_id: e.target.value})}
              className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-forest-500 focus:border-forest-500 dark:text-ivory outline-none"
            >
              <option value="">Select a factor...</option>
              {factors.map(f => <option key={f.id} value={f.id}>{f.name} ({f.co2e_per_unit} {f.unit})</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Source Type</label>
              <select 
                value={emissionForm.source_type}
                onChange={e => setEmissionForm({...emissionForm, source_type: e.target.value})}
                className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-forest-500 focus:border-forest-500 dark:text-ivory outline-none"
              >
                <option value="Facility">Facility</option>
                <option value="Fleet">Fleet</option>
                <option value="Travel">Travel</option>
                <option value="Supply Chain">Supply Chain</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Quantity</label>
              <input 
                type="number" 
                step="0.01"
                required
                value={emissionForm.quantity}
                onChange={e => setEmissionForm({...emissionForm, quantity: e.target.value})}
                className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-forest-500 focus:border-forest-500 dark:text-ivory outline-none"
                placeholder="0.00"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Record ID (Reference)</label>
            <input 
              type="text" 
              required
              value={emissionForm.source_record_id}
              onChange={e => setEmissionForm({...emissionForm, source_record_id: e.target.value})}
              className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-forest-500 focus:border-forest-500 dark:text-ivory outline-none"
              placeholder="e.g., INVOICE-123"
            />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsEmissionModalOpen(false)} className="px-5 py-2.5 text-sage-600 dark:text-sage-400 font-medium hover:bg-sage-100 dark:hover:bg-ash-800 rounded-xl transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 bg-forest-900 text-ivory font-medium rounded-xl hover:bg-forest-800 transition-colors disabled:opacity-50 shadow-sm shadow-forest-900/20">{isSubmitting ? 'Saving...' : 'Log Emission'}</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isFactorModalOpen} onClose={() => setIsFactorModalOpen(false)} title="Add Emission Factor">
        <form onSubmit={handleAddFactor} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Factor Name</label>
            <input type="text" required value={factorForm.name} onChange={e => setFactorForm({...factorForm, name: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-forest-500 outline-none" placeholder="e.g., Grid Electricity" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Activity Type</label>
              <select value={factorForm.activity_type} onChange={e => setFactorForm({...factorForm, activity_type: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-forest-500 outline-none">
                <option value="Facility">Facility</option>
                <option value="Fleet">Fleet</option>
                <option value="Travel">Travel</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Unit</label>
              <input type="text" required value={factorForm.unit} onChange={e => setFactorForm({...factorForm, unit: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-forest-500 outline-none" placeholder="e.g., kWh" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Value (kgCO2e/unit)</label>
              <input type="number" step="0.0001" required value={factorForm.co2e_per_unit} onChange={e => setFactorForm({...factorForm, co2e_per_unit: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-forest-500 outline-none" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Effective Date</label>
              <input type="date" required value={factorForm.effective_from} onChange={e => setFactorForm({...factorForm, effective_from: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-forest-500 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Data Source</label>
            <input type="text" required value={factorForm.source} onChange={e => setFactorForm({...factorForm, source: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-forest-500 outline-none" placeholder="e.g., EPA 2024" />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsFactorModalOpen(false)} className="px-5 py-2.5 text-sage-600 dark:text-sage-400 font-medium hover:bg-sage-100 dark:hover:bg-ash-800 rounded-xl transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 bg-forest-900 text-ivory font-medium rounded-xl hover:bg-forest-800 transition-colors disabled:opacity-50 shadow-sm shadow-forest-900/20">{isSubmitting ? 'Saving...' : 'Add Factor'}</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isGoalModalOpen} onClose={() => setIsGoalModalOpen(false)} title="Add Reduction Goal">
        <form onSubmit={handleAddGoal} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Metric Type</label>
            <input type="text" required value={goalForm.metric_type} onChange={e => setGoalForm({...goalForm, metric_type: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-forest-500 outline-none" placeholder="e.g., Carbon Reduction" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Target Value</label>
              <input type="number" required value={goalForm.target_value} onChange={e => setGoalForm({...goalForm, target_value: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-forest-500 outline-none" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Unit</label>
              <input type="text" required value={goalForm.unit} onChange={e => setGoalForm({...goalForm, unit: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-forest-500 outline-none" placeholder="e.g., tCO2e" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Baseline Value</label>
              <input type="number" required value={goalForm.baseline_value} onChange={e => setGoalForm({...goalForm, baseline_value: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-forest-500 outline-none" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Target Date</label>
              <input type="date" required value={goalForm.target_date} onChange={e => setGoalForm({...goalForm, target_date: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-forest-500 outline-none" />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsGoalModalOpen(false)} className="px-5 py-2.5 text-sage-600 dark:text-sage-400 font-medium hover:bg-sage-100 dark:hover:bg-ash-800 rounded-xl transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 bg-forest-900 text-ivory font-medium rounded-xl hover:bg-forest-800 transition-colors disabled:opacity-50 shadow-sm shadow-forest-900/20">{isSubmitting ? 'Saving...' : 'Save Goal'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
