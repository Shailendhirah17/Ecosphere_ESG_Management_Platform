import React, { useEffect, useState } from 'react';
import { ShieldCheck, Plus, Edit2, Trash2, Calendar, FileText, AlertCircle, Briefcase } from 'lucide-react';
import Modal from '../components/Modal';

export default function Governance() {
  const [activeTab, setActiveTab] = useState<'audits' | 'issues'>('audits');

  // Data States
  const [audits, setAudits] = useState<any[]>([]);
  const [issues, setIssues] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);

  // Modal States
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form States
  const [auditForm, setAuditForm] = useState({
    department_id: '', audit_type: '', scheduled_date: new Date().toISOString().split('T')[0],
    auditor: ''
  });
  const [issueForm, setIssueForm] = useState({
    audit_id: '', severity: 'Medium', description: '', due_date: new Date().toISOString().split('T')[0]
  });

  const fetchData = () => {
    fetch('http://localhost:3000/audits').then(r => r.json()).then(setAudits).catch(console.error);
    fetch('http://localhost:3000/compliance-issues').then(r => r.json()).then(setIssues).catch(console.error);
    fetch('http://localhost:3000/departments').then(r => r.json()).then(setDepartments).catch(console.error);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleScheduleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:3000/audits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...auditForm,
          scheduled_date: new Date(auditForm.scheduled_date).toISOString(),
          status: 'Scheduled'
        })
      });
      if (res.ok) {
        setIsAuditModalOpen(false);
        setAuditForm({ department_id: '', audit_type: '', scheduled_date: new Date().toISOString().split('T')[0], auditor: '' });
        fetchData();
      } else {
        alert('Failed to schedule audit');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReportIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:3000/compliance-issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...issueForm,
          audit_id: issueForm.audit_id || null, // Optional
          due_date: new Date(issueForm.due_date).toISOString(),
          owner_employee_id: 'emp-demo',
          status: 'Open',
          raised_date: new Date().toISOString()
        })
      });
      if (res.ok) {
        setIsIssueModalOpen(false);
        setIssueForm({ audit_id: '', severity: 'Medium', description: '', due_date: new Date().toISOString().split('T')[0] });
        fetchData();
      } else {
        alert('Failed to report issue');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDepartmentName = (id: string) => departments.find(d => d.id === id)?.name || id;

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-forest-900 dark:text-ivory tracking-tight mb-2 flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500">
              <ShieldCheck className="w-8 h-8" />
            </div>
            Governance & Compliance
          </h1>
          <p className="text-sage-500">
            Monitor compliance issues, schedule audits, and enforce ESG policies.
          </p>
        </div>
      </div>

      <div className="flex space-x-1 bg-sage-100 dark:bg-ash-800 p-1.5 rounded-2xl w-fit mb-8 shadow-sm">
        <button
          onClick={() => setActiveTab('audits')}
          className={`flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeTab === 'audits' ? 'bg-white dark:bg-ash-900 text-amber-700 dark:text-amber-400 shadow-sm' : 'text-sage-600 dark:text-sage-400 hover:bg-white/50 dark:hover:bg-ash-900/50'}`}
        >
          <FileText className="w-4 h-4 mr-2" />
          Audits
        </button>
        <button
          onClick={() => setActiveTab('issues')}
          className={`flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeTab === 'issues' ? 'bg-white dark:bg-ash-900 text-amber-700 dark:text-amber-400 shadow-sm' : 'text-sage-600 dark:text-sage-400 hover:bg-white/50 dark:hover:bg-ash-900/50'}`}
        >
          <AlertCircle className="w-4 h-4 mr-2" />
          Compliance Issues
        </button>
      </div>

      <div className="bg-white dark:bg-ash-900 rounded-3xl border border-sage-100 dark:border-ash-800 shadow-sm overflow-hidden min-h-[400px]">
        {activeTab === 'audits' && (
          <div className="overflow-x-auto">
            <div className="p-6 border-b border-sage-100 dark:border-ash-800 flex justify-between items-center bg-ivory dark:bg-ash-900/50">
              <h3 className="text-xl font-display font-bold text-forest-900 dark:text-ivory">Audit Schedule</h3>
              <button 
                onClick={() => setIsAuditModalOpen(true)}
                className="flex items-center px-4 py-2 bg-amber-600 text-white hover:bg-amber-700 rounded-xl text-sm font-medium transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 mr-1" /> Schedule Audit
              </button>
            </div>
            <table className="w-full text-left text-sm text-sage-600 dark:text-sage-400">
              <thead className="bg-sage-50/50 dark:bg-ash-800/20 text-xs font-bold uppercase tracking-widest text-sage-500 border-b border-sage-100 dark:border-ash-800">
                <tr>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Audit Type</th>
                  <th className="px-6 py-4">Auditor</th>
                  <th className="px-6 py-4">Scheduled Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {audits.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-16 text-center text-sage-400">No audits scheduled.</td></tr>
                ) : audits.map(a => (
                  <tr key={a.id} className="border-b border-sage-100 dark:border-ash-800 hover:bg-sage-50 dark:hover:bg-ash-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-forest-900 dark:text-ivory">{getDepartmentName(a.department_id)}</td>
                    <td className="px-6 py-4 font-semibold">{a.audit_type}</td>
                    <td className="px-6 py-4">{a.auditor}</td>
                    <td className="px-6 py-4">{new Date(a.scheduled_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-lg ${a.status === 'Completed' ? 'bg-forest-50 text-forest-700' : 'bg-amber-50 text-amber-700'}`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'issues' && (
          <div className="overflow-x-auto">
            <div className="p-6 border-b border-sage-100 dark:border-ash-800 flex justify-between items-center bg-ivory dark:bg-ash-900/50">
              <h3 className="text-xl font-display font-bold text-forest-900 dark:text-ivory">Issue Tracking</h3>
              <button 
                onClick={() => setIsIssueModalOpen(true)}
                className="flex items-center px-4 py-2 bg-amber-600 text-white hover:bg-amber-700 rounded-xl text-sm font-medium transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 mr-1" /> Report Issue
              </button>
            </div>
            <table className="w-full text-left text-sm text-sage-600 dark:text-sage-400">
              <thead className="bg-sage-50/50 dark:bg-ash-800/20 text-xs font-bold uppercase tracking-widest text-sage-500 border-b border-sage-100 dark:border-ash-800">
                <tr>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Severity</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {issues.length === 0 ? (
                   <tr><td colSpan={4} className="px-6 py-16 text-center text-sage-400">No issues found.</td></tr>
                ) : issues.map(i => (
                  <tr key={i.id} className="border-b border-sage-100 dark:border-ash-800 hover:bg-sage-50 dark:hover:bg-ash-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-forest-900 dark:text-ivory">{i.description}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-lg ${i.severity === 'Critical' || i.severity === 'High' ? 'bg-status-critical/10 text-status-critical' : 'bg-status-warning/10 text-status-warning'}`}>
                        {i.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4">{new Date(i.due_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-lg ${i.status === 'Resolved' ? 'bg-forest-50 text-forest-700' : 'bg-sage-100 text-sage-600'}`}>
                        {i.status}
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
      <Modal isOpen={isAuditModalOpen} onClose={() => setIsAuditModalOpen(false)} title="Schedule Audit">
        <form onSubmit={handleScheduleAudit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Audit Type</label>
            <input type="text" required value={auditForm.audit_type} onChange={e => setAuditForm({...auditForm, audit_type: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-amber-500 outline-none" placeholder="e.g., ISO 14001 Recertification" />
          </div>
          <div>
            <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Department</label>
            <select required value={auditForm.department_id} onChange={e => setAuditForm({...auditForm, department_id: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-amber-500 outline-none">
              <option value="">Select a department...</option>
              {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Auditor</label>
              <input type="text" required value={auditForm.auditor} onChange={e => setAuditForm({...auditForm, auditor: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-amber-500 outline-none" placeholder="e.g., SGS Certification" />
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Scheduled Date</label>
              <input type="date" required value={auditForm.scheduled_date} onChange={e => setAuditForm({...auditForm, scheduled_date: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-amber-500 outline-none" />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsAuditModalOpen(false)} className="px-5 py-2.5 text-sage-600 dark:text-sage-400 font-medium hover:bg-sage-100 dark:hover:bg-ash-800 rounded-xl transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 bg-amber-600 text-white font-medium rounded-xl hover:bg-amber-700 transition-colors disabled:opacity-50 shadow-sm shadow-amber-900/20">{isSubmitting ? 'Saving...' : 'Schedule Audit'}</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isIssueModalOpen} onClose={() => setIsIssueModalOpen(false)} title="Report Issue">
        <form onSubmit={handleReportIssue} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Description</label>
            <textarea required rows={3} value={issueForm.description} onChange={e => setIssueForm({...issueForm, description: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-amber-500 outline-none" placeholder="Detail the compliance issue..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Severity</label>
              <select required value={issueForm.severity} onChange={e => setIssueForm({...issueForm, severity: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-amber-500 outline-none">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Due Date</label>
              <input type="date" required value={issueForm.due_date} onChange={e => setIssueForm({...issueForm, due_date: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-amber-500 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-1">Related Audit (Optional)</label>
            <select value={issueForm.audit_id} onChange={e => setIssueForm({...issueForm, audit_id: e.target.value})} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-amber-500 outline-none">
              <option value="">None</option>
              {audits.map(a => <option key={a.id} value={a.id}>{a.audit_type}</option>)}
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsIssueModalOpen(false)} className="px-5 py-2.5 text-sage-600 dark:text-sage-400 font-medium hover:bg-sage-100 dark:hover:bg-ash-800 rounded-xl transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 bg-amber-600 text-white font-medium rounded-xl hover:bg-amber-700 transition-colors disabled:opacity-50 shadow-sm shadow-amber-900/20">{isSubmitting ? 'Saving...' : 'Report Issue'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
