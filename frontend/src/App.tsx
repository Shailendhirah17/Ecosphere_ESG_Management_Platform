import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Leaf, 
  Users, 
  ShieldCheck, 
  Award,
  Settings,
  Bell,
  Search,
  Menu,
  Building2,
  FileText
} from 'lucide-react';
import GeoRing from './components/GeoRing';
import Departments from './pages/Departments';
import Environmental from './pages/Environmental';
import Social from './pages/Social';
import Governance from './pages/Governance';
import Gamification from './pages/Gamification';
import Reports from './pages/Reports';

function DashboardContent() {
  const [co2e, setCo2e] = useState(0);
  const [openAudits, setOpenAudits] = useState(0);
  const [csrActivities, setCsrActivities] = useState(0);
  
  const [esgScore, setEsgScore] = useState(78.4); // Fallback score
  const [chartData, setChartData] = useState<number[]>([0,0,0,0,0,0]);
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactions, audits, activities, scores] = await Promise.all([
          fetch('http://localhost:3000/carbon-transactions').then(r => r.json()),
          fetch('http://localhost:3000/audits').then(r => r.json()),
          fetch('http://localhost:3000/csr-activities').then(r => r.json()),
          fetch('http://localhost:3000/department-scores').then(r => r.json())
        ]);

        // 1. Top level stats
        const totalCo2 = transactions.reduce((acc: number, t: any) => acc + t.calculated_co2e, 0);
        setCo2e(totalCo2);
        setOpenAudits(audits.filter((a: any) => a.status === 'Scheduled').length);
        setCsrActivities(activities.length);

        // 2. ESG Score average
        if (scores.length > 0) {
          const avgScore = scores.reduce((acc: number, s: any) => acc + s.total_score, 0) / scores.length;
          setEsgScore(avgScore);
        }

        // 3. Chart Data (Last 6 months of emissions)
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentMonth = new Date().getMonth();
        
        const labels: string[] = [];
        const rawData: number[] = [0, 0, 0, 0, 0, 0];
        
        for (let i = 5; i >= 0; i--) {
          let mIndex = currentMonth - i;
          if (mIndex < 0) mIndex += 12;
          labels.push(months[mIndex]);
        }
        setChartLabels(labels);

        transactions.forEach((t: any) => {
          const date = new Date(t.transaction_date);
          const mIndex = date.getMonth();
          const yearDiff = new Date().getFullYear() - date.getFullYear();
          
          // Only map if within last 6 months
          let diffMonths = currentMonth - mIndex + (yearDiff * 12);
          if (diffMonths >= 0 && diffMonths < 6) {
            rawData[5 - diffMonths] += t.calculated_co2e;
          }
        });

        const maxVal = Math.max(...rawData, 1); // Avoid div by zero
        const heights = rawData.map(v => (v / maxVal) * 100);
        setChartData(heights);

        // 4. Recent Activity Feed
        let combinedFeed: any[] = [];
        
        transactions.forEach((t: any) => combinedFeed.push({
          date: new Date(t.transaction_date),
          title: 'Emission Logged',
          desc: `${t.source_type}: ${t.quantity} unit(s)`,
          icon: Leaf,
          color: 'text-bio-500 bg-bio-50 dark:bg-bio-900/30'
        }));

        activities.forEach((a: any) => combinedFeed.push({
          date: new Date(a.start_date), // Using start date as proxy for created
          title: 'New CSR Activity',
          desc: a.title,
          icon: Users,
          color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/30'
        }));

        audits.forEach((a: any) => combinedFeed.push({
          date: new Date(a.scheduled_date),
          title: 'Audit Scheduled',
          desc: a.audit_type,
          icon: ShieldCheck,
          color: 'text-forest-500 bg-forest-50 dark:bg-forest-900/30'
        }));

        combinedFeed.sort((a, b) => b.date.getTime() - a.date.getTime());
        
        // Format relative time (naive)
        const now = new Date();
        const formattedFeed = combinedFeed.slice(0, 5).map(item => {
          const diffDays = Math.floor((now.getTime() - item.date.getTime()) / (1000 * 3600 * 24));
          const timeStr = diffDays === 0 ? 'Today' : diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
          return { ...item, time: timeStr };
        });

        setRecentActivity(formattedFeed);

      } catch (err) {
        console.error('Dashboard data fetch failed', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-forest-900 dark:text-ivory tracking-tight mb-2">
            Welcome back, Alex
          </h1>
          <p className="text-sage-500 dark:text-sage-500">
            Here is your organization's real-time ESG performance.
          </p>
        </div>
        <button className="px-6 py-3 bg-forest-900 dark:bg-ivory text-ivory dark:text-forest-900 font-medium rounded-xl shadow-lg shadow-forest-900/10 hover:shadow-xl hover:-translate-y-0.5 transition-all">
          Generate Report
        </button>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Signature ESG Score Card */}
        <div className="relative overflow-hidden bg-white dark:bg-ash-900 rounded-3xl p-6 border border-sage-100 dark:border-ash-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-semibold text-sage-900 dark:text-sage-500 uppercase tracking-wider">Total ESG Score</p>
          </div>
          <div className="mt-2 mb-4">
             <GeoRing score={Number(esgScore.toFixed(1))} />
          </div>
          <div className="flex items-center justify-center text-sm">
            <span className="font-semibold text-forest-500">+2.1%</span>
            <span className="text-sage-500 ml-2">vs last month</span>
          </div>
        </div>

        {[
          { label: 'Total Emissions', value: co2e.toFixed(1), unit: 'tCO2e', trend: 'Live', trendDown: true, icon: Leaf, iconColor: 'text-forest-500' },
          { label: 'CSR Activities', value: csrActivities.toString(), trend: '+5.3%', trendDown: false, icon: Users, iconColor: 'text-bio-500' },
          { label: 'Open Audits', value: openAudits.toString(), trend: '-2', trendDown: true, icon: ShieldCheck, iconColor: 'text-amber-500' }
        ].map((stat, i) => (
          <div key={i} className="relative overflow-hidden bg-white dark:bg-ash-900 rounded-3xl p-6 border border-sage-100 dark:border-ash-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div className="flex justify-between items-start mb-6">
              <p className="text-sm font-semibold text-sage-900 dark:text-sage-500 uppercase tracking-wider">{stat.label}</p>
              <div className="p-2 rounded-xl bg-sage-50 dark:bg-ash-800">
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <h3 className="text-5xl font-display font-bold text-forest-900 dark:text-ivory tracking-tighter">
                  {stat.value}
                </h3>
                {stat.unit && <span className="text-sm text-sage-500 font-medium">{stat.unit}</span>}
              </div>
              <div className="flex items-center text-sm">
                <span className={`font-semibold ${stat.trendDown ? 'text-forest-500' : 'text-forest-500'}`}>
                  {stat.trend}
                </span>
                <span className="text-sage-500 ml-2">vs last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Dashboard Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-ash-900 rounded-3xl p-6 border border-sage-100 dark:border-ash-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold text-forest-900 dark:text-ivory">Emissions Trend</h2>
            <select className="bg-sage-50 dark:bg-ash-800 border-none text-sm font-medium rounded-xl focus:ring-forest-500 py-2 px-4 cursor-pointer text-sage-900 dark:text-sage-100">
              <option>Last 6 Months</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {chartData.map((h, i) => (
              <div key={i} className="w-full relative group flex justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-forest-500/10 to-transparent rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div 
                  style={{ height: `${Math.max(h, 5)}%` }} // Ensure at least 5% height for visibility
                  className="w-full max-w-[48px] bg-gradient-to-t from-forest-900 to-forest-500 rounded-t-2xl shadow-sm relative z-10 group-hover:scale-y-105 origin-bottom transition-transform duration-300"
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 text-xs font-bold text-sage-400 uppercase tracking-widest px-6">
            {chartLabels.map((lbl, i) => <span key={i}>{lbl}</span>)}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-ash-900 rounded-3xl p-6 border border-sage-100 dark:border-ash-800 shadow-sm overflow-y-auto max-h-[380px]">
          <h2 className="text-xl font-display font-bold text-forest-900 dark:text-ivory mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {recentActivity.length === 0 ? (
              <p className="text-sage-500 text-sm text-center py-8">No recent activity found.</p>
            ) : recentActivity.map((act, i) => (
              <div key={i} className="flex gap-4 group cursor-pointer hover:bg-sage-50 dark:hover:bg-ash-800/50 p-2 -mx-2 rounded-xl transition-colors">
                <div className={`p-3 rounded-2xl h-fit ${act.color} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <act.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-forest-900 dark:text-ivory">{act.title}</h4>
                  <p className="text-xs text-sage-500 mt-1 line-clamp-1">{act.desc}</p>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sage-400 mt-2 block">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-sage-50 dark:bg-ash-950 flex transition-colors duration-300">
      
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-ivory dark:bg-ash-900 border-r border-sage-100 dark:border-ash-800 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full px-4 py-6 overflow-y-auto">
          <div className="flex items-center mb-10 px-2">
            <div className="w-10 h-10 bg-forest-900 dark:bg-ivory rounded-xl flex items-center justify-center shadow-lg shadow-forest-900/20 mr-3">
              <Leaf className="w-6 h-6 text-ivory dark:text-forest-900" />
            </div>
            <span className="text-2xl font-display font-bold text-forest-900 dark:text-ivory tracking-tight">
              EcoSphere
            </span>
          </div>
          
          <ul className="space-y-2">
            <li>
              <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-forest-50 text-forest-900 dark:bg-forest-900/20 dark:text-forest-50' : 'text-sage-900 hover:bg-sage-100 dark:text-sage-100 dark:hover:bg-ash-800/50 group'}`}>
                <LayoutDashboard className={`w-5 h-5 mr-3 ${activeTab !== 'dashboard' && 'opacity-70 group-hover:opacity-100 group-hover:text-forest-500'}`} />
                Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('departments')} className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'departments' ? 'bg-forest-50 text-forest-900 dark:bg-forest-900/20 dark:text-forest-50' : 'text-sage-900 hover:bg-sage-100 dark:text-sage-100 dark:hover:bg-ash-800/50 group'}`}>
                <Building2 className={`w-5 h-5 mr-3 ${activeTab !== 'departments' && 'opacity-70 group-hover:opacity-100 group-hover:text-forest-500'}`} />
                Master Data
              </button>
            </li>
            <div className="pt-6 pb-2 px-3">
              <p className="text-[10px] font-bold text-sage-500 uppercase tracking-widest">Modules</p>
            </div>
            <li>
              <button onClick={() => setActiveTab('environmental')} className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'environmental' ? 'bg-forest-50 text-forest-900 dark:bg-forest-900/20 dark:text-forest-50' : 'text-sage-900 hover:bg-sage-100 dark:text-sage-100 dark:hover:bg-ash-800/50 group'}`}>
                <Leaf className={`w-5 h-5 mr-3 ${activeTab !== 'environmental' && 'opacity-70 group-hover:opacity-100 group-hover:text-forest-500'}`} />
                Environmental
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('social')} className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'social' ? 'bg-bio-50 text-bio-900 dark:bg-bio-900/20 dark:text-bio-100' : 'text-sage-900 hover:bg-sage-100 dark:text-sage-100 dark:hover:bg-ash-800/50 group'}`}>
                <Users className={`w-5 h-5 mr-3 ${activeTab !== 'social' && 'opacity-70 group-hover:opacity-100 group-hover:text-bio-500'}`} />
                Social (CSR)
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('governance')} className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'governance' ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400' : 'text-sage-900 hover:bg-sage-100 dark:text-sage-100 dark:hover:bg-ash-800/50 group'}`}>
                <ShieldCheck className={`w-5 h-5 mr-3 ${activeTab !== 'governance' && 'opacity-70 group-hover:opacity-100 group-hover:text-amber-500'}`} />
                Governance
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('gamification')} className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'gamification' ? 'bg-bio-50 text-bio-900 dark:bg-bio-900/20 dark:text-bio-100' : 'text-sage-900 hover:bg-sage-100 dark:text-sage-100 dark:hover:bg-ash-800/50 group'}`}>
                <Award className={`w-5 h-5 mr-3 ${activeTab !== 'gamification' && 'opacity-70 group-hover:opacity-100 group-hover:text-bio-500'}`} />
                Gamification
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('reports')} className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'reports' ? 'bg-sage-100 text-sage-900 dark:bg-ash-800 dark:text-ivory' : 'text-sage-900 hover:bg-sage-100 dark:text-sage-100 dark:hover:bg-ash-800/50 group'}`}>
                <FileText className={`w-5 h-5 mr-3 ${activeTab !== 'reports' && 'opacity-70 group-hover:opacity-100 group-hover:text-sage-500'}`} />
                Reports
              </button>
            </li>
          </ul>
          <div className="absolute bottom-6 left-4 right-4">
            <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-sage-100 text-sage-900 dark:bg-ash-800 dark:text-ivory' : 'text-sage-900 hover:bg-sage-100 dark:text-sage-100 dark:hover:bg-ash-800/50 group'}`}>
              <Settings className={`w-5 h-5 mr-3 ${activeTab !== 'settings' && 'opacity-70 group-hover:opacity-100'}`} />
              Settings
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300 ease-in-out min-h-screen flex flex-col w-full`}>
        
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 bg-ivory/80 dark:bg-ash-950/80 backdrop-blur-md border-b border-sage-100/50 dark:border-ash-800/50">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-sage-500 hover:bg-sage-100 dark:hover:bg-ash-800 focus:outline-none focus:ring-2 focus:ring-forest-500"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-sage-400" />
              </div>
              <input 
                type="text" 
                className="block w-full p-2 pl-10 text-sm text-sage-900 border border-sage-200 rounded-full bg-sage-50 focus:ring-forest-500 focus:border-forest-500 dark:bg-ash-900 dark:border-ash-800 dark:placeholder-sage-500 dark:text-ivory transition-all shadow-sm focus:shadow-md" 
                placeholder="Search ESG data..." 
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-sage-500 hover:bg-sage-100 dark:hover:bg-ash-800 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1.5 w-2 h-2 bg-status-critical rounded-full border-2 border-ivory dark:border-ash-950"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-sage-200 dark:border-ash-800">
              <img className="w-9 h-9 rounded-full object-cover border-2 border-forest-100 dark:border-forest-900" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User avatar" />
              <div className="hidden md:block text-sm">
                <p className="font-semibold text-forest-900 dark:text-ivory">Alex Morgan</p>
                <p className="text-xs text-sage-500 dark:text-sage-400 font-medium tracking-wide">ESG DIRECTOR</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && <DashboardContent />}
          {activeTab === 'departments' && <Departments />}
          {activeTab === 'environmental' && <Environmental />}
          {activeTab === 'social' && <Social />}
          {activeTab === 'governance' && <Governance />}
          {activeTab === 'gamification' && <Gamification />}
          {activeTab === 'reports' && <Reports />}
          {activeTab === 'settings' && (
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center h-[400px] border-2 border-dashed border-sage-200 dark:border-ash-800 rounded-3xl">
              <div className="p-4 bg-sage-100 dark:bg-ash-800 rounded-2xl mb-4">
                <Settings className="w-8 h-8 text-forest-600 dark:text-forest-400" />
              </div>
              <h2 className="text-xl font-display font-bold text-forest-900 dark:text-ivory mb-1">Platform Settings</h2>
              <p className="text-sm text-sage-500">Configuration and user management coming soon.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
