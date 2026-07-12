import React, { useEffect, useState } from 'react';
import { Users, Filter, Search, Heart, Clock, CheckCircle } from 'lucide-react';

export default function Social() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'my-activities' | 'metrics'>('catalog');
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/csr-activities')
      .then(r => r.json())
      .then(setActivities)
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-forest-900 dark:text-ivory tracking-tight mb-2 flex items-center gap-3">
            <div className="p-3 bg-bio-500/10 rounded-2xl text-bio-500">
              <Heart className="w-8 h-8" />
            </div>
            Social Impact & CSR
          </h1>
          <p className="text-sage-500">
            Browse and register for Corporate Social Responsibility activities.
          </p>
        </div>
      </div>

      <div className="flex space-x-1 bg-sage-100 dark:bg-ash-800 p-1.5 rounded-2xl w-fit mb-8 shadow-sm">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeTab === 'catalog' ? 'bg-white dark:bg-ash-900 text-forest-900 dark:text-ivory shadow-sm' : 'text-sage-600 dark:text-sage-400 hover:bg-white/50 dark:hover:bg-ash-900/50'}`}
        >
          <Search className="w-4 h-4 mr-2" />
          Activity Catalog
        </button>
        <button
          onClick={() => setActiveTab('my-activities')}
          className={`flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeTab === 'my-activities' ? 'bg-white dark:bg-ash-900 text-forest-900 dark:text-ivory shadow-sm' : 'text-sage-600 dark:text-sage-400 hover:bg-white/50 dark:hover:bg-ash-900/50'}`}
        >
          <Clock className="w-4 h-4 mr-2" />
          My Registrations
        </button>
        <button
          onClick={() => setActiveTab('metrics')}
          className={`flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeTab === 'metrics' ? 'bg-white dark:bg-ash-900 text-forest-900 dark:text-ivory shadow-sm' : 'text-sage-600 dark:text-sage-400 hover:bg-white/50 dark:hover:bg-ash-900/50'}`}
        >
          <Users className="w-4 h-4 mr-2" />
          Diversity Metrics
        </button>
      </div>

      <div className="bg-white dark:bg-ash-900 rounded-3xl border border-sage-100 dark:border-ash-800 shadow-sm min-h-[400px]">
        {activeTab === 'catalog' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-display font-bold text-forest-900 dark:text-ivory">Upcoming Events</h3>
              <button className="p-2 border border-sage-200 dark:border-ash-800 text-sage-600 dark:text-sage-400 rounded-xl hover:bg-sage-50 dark:hover:bg-ash-800">
                <Filter className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.length === 0 ? (
                <div className="col-span-full py-16 flex flex-col items-center justify-center text-sage-500">
                  <Heart className="w-12 h-12 text-sage-300 mb-4" />
                  <h4 className="text-lg font-display font-bold text-forest-900 dark:text-ivory mb-1">No activities found</h4>
                  <p className="text-sage-500 text-sm">Create CSR activities to see them here.</p>
                </div>
              ) : activities.map(act => (
                <div key={act.id} className="border border-sage-200 dark:border-ash-800 rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider bg-forest-50 text-forest-700 dark:bg-forest-900/30 dark:text-forest-400 rounded-lg">
                      {act.status}
                    </span>
                    <span className="text-xs font-semibold text-sage-500">Cap: {act.capacity}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-forest-900 dark:text-ivory mb-2">{act.title}</h3>
                  <p className="text-sm text-sage-600 dark:text-sage-400 mb-6 flex-grow">{act.description}</p>
                  
                  <div className="pt-4 border-t border-sage-100 dark:border-ash-800 mt-auto">
                    <p className="text-xs text-sage-500 mb-4">
                      {new Date(act.start_date).toLocaleDateString()} - {new Date(act.end_date).toLocaleDateString()}
                    </p>
                    <button className="w-full py-3 bg-bio-500 hover:bg-bio-600 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-bio-500/20">
                      Register
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'my-activities' && (
          <div className="p-6">
            <h3 className="text-xl font-display font-bold text-forest-900 dark:text-ivory mb-6">Your Registrations</h3>
            <div className="max-w-3xl space-y-4">
              <div className="col-span-full py-16 flex flex-col items-center justify-center text-sage-500">
                <CheckCircle className="w-12 h-12 text-sage-300 mb-4" />
                <h4 className="text-lg font-display font-bold text-forest-900 dark:text-ivory mb-1">No registrations</h4>
                <p className="text-sage-500 text-sm">You haven't joined any activities yet.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="p-6">
            <h3 className="text-xl font-display font-bold text-forest-900 dark:text-ivory mb-6">Diversity & Inclusion Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-sage-200 dark:border-ash-800 rounded-3xl p-6">
                <h4 className="font-semibold text-forest-900 dark:text-ivory mb-4">Gender Ratio by Department</h4>
                <div className="space-y-4">
                  {[
                    { dept: 'Engineering', m: 60, f: 35, o: 5 },
                    { dept: 'Sales', m: 45, f: 50, o: 5 },
                    { dept: 'Executive', m: 70, f: 30, o: 0 },
                  ].map(d => (
                    <div key={d.dept}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-forest-900 dark:text-ivory">{d.dept}</span>
                      </div>
                      <div className="h-3 w-full rounded-full overflow-hidden flex shadow-inner">
                        <div style={{width: `${d.m}%`}} className="bg-sage-300 dark:bg-ash-700" title={`Male: ${d.m}%`}></div>
                        <div style={{width: `${d.f}%`}} className="bg-forest-500" title={`Female: ${d.f}%`}></div>
                        <div style={{width: `${d.o}%`}} className="bg-bio-500" title={`Other: ${d.o}%`}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-6 text-xs text-sage-500">
                  <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-sage-300 dark:bg-ash-700 mr-2"></span> Male</div>
                  <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-forest-500 mr-2"></span> Female</div>
                  <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-bio-500 mr-2"></span> Other</div>
                </div>
              </div>
              
              <div className="border border-sage-200 dark:border-ash-800 rounded-3xl p-6 flex flex-col justify-center items-center text-center bg-sage-50 dark:bg-ash-800/20">
                <p className="text-sm font-semibold text-sage-500 uppercase tracking-wider mb-2">Total Employee Volunteer Hours</p>
                <div className="text-6xl font-display font-bold text-forest-900 dark:text-ivory tracking-tighter">1,240<span className="text-3xl text-sage-400 ml-1">hrs</span></div>
                <p className="text-sm text-forest-500 font-medium mt-4 bg-forest-50 dark:bg-forest-900/30 px-4 py-1.5 rounded-full">+12% vs last quarter</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
