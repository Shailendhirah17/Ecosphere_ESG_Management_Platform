import React, { useEffect, useState } from 'react';
import { Building2, Plus, Edit2, Trash2 } from 'lucide-react';

export default function Departments() {
  const [departments, setDepartments] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/departments')
      .then(res => res.json())
      .then(setDepartments)
      .catch(console.error);
  }, []);

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

      <div className="bg-white dark:bg-ash-900 rounded-3xl border border-sage-100 dark:border-ash-800 shadow-sm overflow-hidden min-h-[400px]">
        <div className="overflow-x-auto">
          <div className="p-6 border-b border-sage-100 dark:border-ash-800 flex justify-between items-center bg-ivory dark:bg-ash-900/50">
            <h3 className="text-xl font-display font-bold text-forest-900 dark:text-ivory">Departments</h3>
            <button className="flex items-center px-4 py-2 bg-forest-900 text-ivory hover:bg-forest-800 rounded-xl text-sm font-medium transition-colors shadow-sm">
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
      </div>
    </div>
  );
}
