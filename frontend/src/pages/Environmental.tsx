import React, { useEffect, useState } from 'react';
import { Leaf, Plus, Edit2, Trash2, Filter, Search, BarChart3, Database, Target } from 'lucide-react';

export default function Environmental() {
  const [activeTab, setActiveTab] = useState<'factors' | 'transactions' | 'goals'>('transactions');
  
  // States
  const [factors, setFactors] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    // Fetch Emission Factors
    fetch('http://localhost:3000/emission-factors')
      .then(r => r.json())
      .then(setFactors)
      .catch(console.error);

    // Fetch Carbon Transactions
    fetch('http://localhost:3000/carbon-transactions')
      .then(r => r.json())
      .then(setTransactions)
      .catch(console.error);
  }, []);

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
                <button className="flex items-center px-4 py-2 bg-forest-900 text-ivory hover:bg-forest-800 rounded-xl text-sm font-medium transition-colors shadow-sm">
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
                    <td className="px-6 py-4 font-medium text-forest-900 dark:text-ivory">{t.department_id}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider bg-sage-100 text-sage-700 dark:bg-ash-800 dark:text-sage-400 rounded-lg">
                        {t.source_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">{t.quantity_value} {t.quantity_unit}</td>
                    <td className="px-6 py-4 text-right font-bold text-forest-600 dark:text-forest-400">{t.calculated_co2e.toFixed(2)}</td>
                    <td className="px-6 py-4">{new Date(t.date).toLocaleDateString()}</td>
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
              <button className="flex items-center px-4 py-2 bg-forest-900 text-ivory hover:bg-forest-800 rounded-xl text-sm font-medium transition-colors shadow-sm">
                <Plus className="w-4 h-4 mr-1" /> Add Factor
              </button>
            </div>
            <table className="w-full text-left text-sm text-sage-600 dark:text-sage-400">
              <thead className="bg-sage-50/50 dark:bg-ash-800/20 text-xs font-bold uppercase tracking-widest text-sage-500 border-b border-sage-100 dark:border-ash-800">
                <tr>
                  <th className="px-6 py-4">Activity Type</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Unit</th>
                  <th className="px-6 py-4 text-right">Value (kgCO2e/unit)</th>
                  <th className="px-6 py-4">Region</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {factors.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Database className="w-12 h-12 text-sage-300 mb-4" />
                        <h4 className="text-lg font-display font-bold text-forest-900 dark:text-ivory mb-1">No emission factors found</h4>
                        <p className="text-sage-500 text-sm">Add standard factors to enable auto-calculations.</p>
                      </div>
                    </td>
                  </tr>
                ) : factors.map(f => (
                  <tr key={f.id} className="border-b border-sage-100 dark:border-ash-800 hover:bg-sage-50 dark:hover:bg-ash-800/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-forest-900 dark:text-ivory">{f.activity_type}</td>
                    <td className="px-6 py-4 text-sage-500 line-clamp-1">{f.description}</td>
                    <td className="px-6 py-4">{f.unit}</td>
                    <td className="px-6 py-4 text-right font-mono text-sm">{f.value}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider bg-sage-100 text-sage-700 dark:bg-ash-800 dark:text-sage-400 rounded-lg">
                        {f.region}
                      </span>
                    </td>
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
              <div className="border border-sage-200 dark:border-ash-800 rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-display font-bold text-xl text-forest-900 dark:text-ivory">Net Zero 2030</h3>
                  <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider bg-forest-50 text-forest-700 dark:bg-forest-900/30 dark:text-forest-400 rounded-lg">
                    On Track
                  </span>
                </div>
                <p className="text-sm text-sage-600 dark:text-sage-400 mb-6">Achieve net zero emissions across Scope 1 and 2 by 2030.</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-sage-600 dark:text-sage-400">Progress</span>
                    <span className="text-forest-600 dark:text-forest-400">45%</span>
                  </div>
                  <div className="h-3 w-full bg-sage-100 dark:bg-ash-800 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-forest-500 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>

              <div className="border border-sage-200 dark:border-ash-800 border-dashed rounded-3xl p-6 flex flex-col items-center justify-center text-sage-500 hover:bg-sage-50 dark:hover:bg-ash-800/50 cursor-pointer transition-colors group">
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
    </div>
  );
}
