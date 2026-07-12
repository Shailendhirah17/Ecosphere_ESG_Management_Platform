import React, { useEffect, useState } from 'react';
import { ShieldCheck, Plus, FileText, CheckSquare, AlertTriangle, AlertCircle, Layout } from 'lucide-react';

export default function Governance() {
  const [activeTab, setActiveTab] = useState<'policies' | 'audits' | 'issues'>('policies');
  const [policies, setPolicies] = useState<any[]>([]);
  const [audits, setAudits] = useState<any[]>([]);
  const [issues, setIssues] = useState<any[]>([]);

  useEffect(() => {
    if (activeTab === 'policies') {
      fetch('http://localhost:3000/esg-policies').then(r => r.json()).then(setPolicies);
    } else if (activeTab === 'audits') {
      fetch('http://localhost:3000/audits').then(r => r.json()).then(setAudits);
    } else if (activeTab === 'issues') {
      fetch('http://localhost:3000/compliance-issues').then(r => r.json()).then(setIssues);
    }
  }, [activeTab]);

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-forest-900 dark:text-ivory tracking-tight mb-2 flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500">
              <ShieldCheck className="w-8 h-8" />
            </div>
            Governance Hub
          </h1>
          <p className="text-sage-500">
            Manage ESG policies, schedule audits, and track compliance issues.
          </p>
        </div>
      </div>

      <div className="flex space-x-1 bg-sage-100 dark:bg-ash-800 p-1.5 rounded-2xl w-fit mb-8 shadow-sm">
        <button
          onClick={() => setActiveTab('policies')}
          className={`flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeTab === 'policies' ? 'bg-white dark:bg-ash-900 text-forest-900 dark:text-ivory shadow-sm' : 'text-sage-600 dark:text-sage-400 hover:bg-white/50 dark:hover:bg-ash-900/50'}`}
        >
          <FileText className="w-4 h-4 mr-2" />
          Policies
        </button>
        <button
          onClick={() => setActiveTab('audits')}
          className={`flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeTab === 'audits' ? 'bg-white dark:bg-ash-900 text-forest-900 dark:text-ivory shadow-sm' : 'text-sage-600 dark:text-sage-400 hover:bg-white/50 dark:hover:bg-ash-900/50'}`}
        >
          <CheckSquare className="w-4 h-4 mr-2" />
          Audits
        </button>
        <button
          onClick={() => setActiveTab('issues')}
          className={`flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeTab === 'issues' ? 'bg-white dark:bg-ash-900 text-forest-900 dark:text-ivory shadow-sm' : 'text-sage-600 dark:text-sage-400 hover:bg-white/50 dark:hover:bg-ash-900/50'}`}
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          Compliance Issues
        </button>
      </div>

      <div className="bg-white dark:bg-ash-900 rounded-3xl border border-sage-100 dark:border-ash-800 shadow-sm overflow-hidden min-h-[400px]">
        {activeTab === 'policies' && (
          <div className="overflow-x-auto">
            <div className="p-6 border-b border-sage-100 dark:border-ash-800 flex justify-between items-center bg-ivory dark:bg-ash-900/50">
              <h3 className="text-xl font-display font-bold text-forest-900 dark:text-ivory">ESG Policy Repository</h3>
              <button className="flex items-center px-4 py-2 bg-forest-900 text-ivory hover:bg-forest-500 dark:bg-ivory dark:text-forest-900 dark:hover:bg-sage-100 rounded-xl text-sm font-medium transition-colors shadow-sm">
                <Plus className="w-4 h-4 mr-1" /> Upload Policy
              </button>
            </div>
            <table className="w-full text-left text-sm text-sage-600 dark:text-sage-400">
              <thead className="bg-sage-50/50 dark:bg-ash-800/20 text-xs font-bold uppercase tracking-widest text-sage-500 border-b border-sage-100 dark:border-ash-800">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Version</th>
                  <th className="px-6 py-4">Effective Date</th>
                  <th className="px-6 py-4">Mandatory</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {policies.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <FileText className="w-12 h-12 text-sage-300 mb-4" />
                        <h4 className="text-lg font-display font-bold text-forest-900 dark:text-ivory mb-1">No policies found</h4>
                        <p className="text-sage-500 text-sm">Upload your first ESG policy to get started.</p>
                      </div>
                    </td>
                  </tr>
                ) : policies.map(p => (
                  <tr key={p.id} className="border-b border-sage-100 dark:border-ash-800 hover:bg-sage-50 dark:hover:bg-ash-800/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-forest-900 dark:text-ivory">{p.title}</td>
                    <td className="px-6 py-4 font-mono text-xs">v{p.version}</td>
                    <td className="px-6 py-4">{new Date(p.effective_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{p.mandatory_flag ? 'Yes' : 'No'}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider bg-sage-100 text-sage-800 dark:bg-ash-800 dark:text-sage-300 rounded-lg">
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'audits' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {audits.length === 0 ? (
                <div className="col-span-full py-16 flex flex-col items-center justify-center text-sage-500">
                  <CheckSquare className="w-12 h-12 text-sage-300 mb-4" />
                  <h4 className="text-lg font-display font-bold text-forest-900 dark:text-ivory mb-1">No audits scheduled</h4>
                  <p className="text-sage-500 text-sm">You're all clear for now.</p>
                </div>
              ) : audits.map(a => (
                <div key={a.id} className="border border-sage-200 dark:border-ash-800 rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-display font-bold text-xl text-forest-900 dark:text-ivory">{a.audit_type}</h3>
                    <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider bg-forest-50 text-forest-700 dark:bg-forest-900/30 dark:text-forest-400 rounded-lg">
                      {a.status}
                    </span>
                  </div>
                  <div className="space-y-2 mb-6 text-sm text-sage-600 dark:text-sage-400">
                    <p><strong className="text-forest-900 dark:text-ivory font-semibold">Scheduled:</strong> {new Date(a.scheduled_date).toLocaleDateString()}</p>
                    <p><strong className="text-forest-900 dark:text-ivory font-semibold">Auditor:</strong> {a.auditor}</p>
                  </div>
                  {a.findings_summary && (
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl text-sm text-amber-900 dark:text-amber-200 border border-amber-100 dark:border-amber-900/30">
                      <strong className="block mb-1 text-amber-700 dark:text-amber-400 font-bold">Findings Summary:</strong> 
                      {a.findings_summary}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'issues' && (
          <div className="overflow-x-auto">
            <div className="p-6 border-b border-sage-100 dark:border-ash-800 flex justify-between items-center bg-ivory dark:bg-ash-900/50">
              <h3 className="text-xl font-display font-bold text-forest-900 dark:text-ivory">Compliance Issue Register</h3>
              <button className="flex items-center px-4 py-2 bg-bio-500 text-white hover:bg-bio-600 rounded-xl text-sm font-medium transition-colors shadow-sm shadow-bio-500/20">
                <AlertCircle className="w-4 h-4 mr-1" /> Log Issue
              </button>
            </div>
            <table className="w-full text-left text-sm text-sage-600 dark:text-sage-400">
              <thead className="bg-sage-50/50 dark:bg-ash-800/20 text-xs font-bold uppercase tracking-widest text-sage-500 border-b border-sage-100 dark:border-ash-800">
                <tr>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Severity</th>
                  <th className="px-6 py-4">Owner ID</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {issues.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <ShieldCheck className="w-12 h-12 text-sage-300 mb-4" />
                        <h4 className="text-lg font-display font-bold text-forest-900 dark:text-ivory mb-1">Zero issues found</h4>
                        <p className="text-sage-500 text-sm">Great job keeping everything compliant.</p>
                      </div>
                    </td>
                  </tr>
                ) : issues.map(i => {
                  const isOverdue = i.status === 'Open' && new Date(i.due_date) < new Date();
                  
                  let sevColor = 'bg-status-low/10 text-status-low';
                  if (i.severity === 'Medium') sevColor = 'bg-status-medium/10 text-status-medium';
                  if (i.severity === 'High') sevColor = 'bg-status-high/10 text-status-high';
                  if (i.severity === 'Critical') sevColor = 'bg-status-critical/10 text-status-critical';

                  return (
                    <tr key={i.id} className={`border-b border-sage-100 dark:border-ash-800 hover:bg-sage-50 dark:hover:bg-ash-800/50 transition-colors ${isOverdue ? 'bg-status-critical/5 dark:bg-status-critical/5' : ''}`}>
                      <td className="px-6 py-4 font-semibold text-forest-900 dark:text-ivory line-clamp-1">{i.description}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-lg ${sevColor}`}>
                          {i.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs">{i.owner_employee_id}</td>
                      <td className={`px-6 py-4 font-medium ${isOverdue ? 'text-status-critical' : ''}`}>
                        {new Date(i.due_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-lg ${isOverdue ? 'bg-status-critical text-white shadow-sm shadow-status-critical/30' : 'bg-sage-100 text-sage-700 dark:bg-ash-800 dark:text-sage-400'}`}>
                          {isOverdue ? 'OVERDUE' : i.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
