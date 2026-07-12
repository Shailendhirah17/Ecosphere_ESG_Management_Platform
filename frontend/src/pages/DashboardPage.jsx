import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  Activity, ArrowRight, ShieldCheck, Leaf, Users, Target, FileText,
  AlertCircle, CheckCircle, Clock
} from 'lucide-react';
import { Card, PageHeader, Button } from '../components/common';

// Dummy Data
const esgScoreTrend = [
  { month: 'Jan', score: 72 }, { month: 'Feb', score: 75 },
  { month: 'Mar', score: 78 }, { month: 'Apr', score: 76 },
  { month: 'May', score: 80 }, { month: 'Jun', score: 82 },
];

const emissionsData = [
  { month: 'Jan', scope1: 400, scope2: 240, scope3: 2400 },
  { month: 'Feb', scope1: 300, scope2: 139, scope3: 2210 },
  { month: 'Mar', scope1: 200, scope2: 980, scope3: 2290 },
  { month: 'Apr', scope1: 278, scope2: 390, scope3: 2000 },
  { month: 'May', scope1: 189, scope2: 480, scope3: 2181 },
  { month: 'Jun', scope1: 239, scope2: 380, scope3: 2500 },
];

const deptEmissions = [
  { name: 'Manufacturing', value: 4500 },
  { name: 'Logistics', value: 3200 },
  { name: 'IT', value: 800 },
  { name: 'HQ', value: 500 },
];

const diversityData = [
  { name: 'Male', value: 55 },
  { name: 'Female', value: 42 },
  { name: 'Other', value: 3 },
];

const recentActivities = [
  { id: 1, text: 'New Environmental Policy published', time: '2 hours ago', type: 'governance' },
  { id: 2, text: 'Manufacturing reduced emissions by 5%', time: '5 hours ago', type: 'environmental' },
  { id: 3, text: 'Tree planting drive completed (500 trees)', time: '1 day ago', type: 'social' },
];

const upcomingTasks = [
  { id: 1, text: 'Q3 ESG Audit Review', due: 'Tomorrow', priority: 'high' },
  { id: 2, text: 'Submit Carbon Offset Certificates', due: 'Next Week', priority: 'medium' },
  { id: 3, text: 'Diversity & Inclusion Training', due: 'In 2 weeks', priority: 'low' },
];

// Recharts Animation Settings (from Design Prompt)
const CHART_ANIMATION_DURATION = 1500;

export default function DashboardPage() {
  return (
    <div className="p-8">
      <PageHeader 
        title="Executive Dashboard" 
        breadcrumbs={[{ label: 'Home' }, { label: 'Dashboard' }]}
        actions={[
          { label: 'Download Report', icon: FileText, variant: 'secondary', onClick: () => alert('Report download started (Demo)') }
        ]}
      />

      {/* KPI Cards (With explicit categories mapping to colors/borders) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card title="Overall ESG Score" value="82/100" icon={Activity} trend="+4.5%" trendLabel="vs last quarter" index={0} category="env" />
        <Card title="Total Carbon Emissions" value="12.4k tCO2e" icon={Leaf} trend="-2.1%" trendLabel="vs last quarter" index={1} category="env" />
        <Card title="Employee Participation" value="78%" icon={Users} trend="+12%" trendLabel="vs last quarter" index={2} category="social" />
        <Card title="Governance Compliance" value="94%" icon={ShieldCheck} trend="+1%" trendLabel="vs last quarter" index={3} category="gov" />
        <Card title="Carbon Credits" value="2,500" icon={Target} index={4} category="env" />
        <Card title="Active Goals" value="12" icon={CheckCircle} index={5} category="env" />
        <Card title="CSR Projects" value="8" icon={Users} index={6} category="social" />
        <Card title="Pending Audits" value="3" icon={AlertCircle} index={7} category="alert" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* ESG Score Trend */}
        <div className="bg-[var(--card)] p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-serif text-[var(--ink)] mb-6">ESG Score Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={esgScoreTrend}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    {/* #2F6E4E is the --chart-env Moss Green */}
                    <stop offset="5%" stopColor="#2F6E4E" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2F6E4E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis domain={['auto', 100]} stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '8px', border: '1px solid #E5E7EB', color: 'var(--ink)' }}
                  itemStyle={{ color: 'var(--ink)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#2F6E4E" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                  animationDuration={CHART_ANIMATION_DURATION}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Carbon Emissions by Scope (Using ONLY shades of moss green) */}
        <div className="bg-[var(--card)] p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-serif text-[var(--ink)] mb-6">Carbon Emissions</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emissionsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '8px', border: '1px solid #E5E7EB', color: 'var(--ink)' }}
                  cursor={{fill: '#F3F4F6'}}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: 'var(--muted)', paddingTop: '10px' }} />
                <Bar dataKey="scope1" stackId="a" fill="#1A402D" name="Scope 1" animationDuration={CHART_ANIMATION_DURATION} />
                <Bar dataKey="scope2" stackId="a" fill="#2F6E4E" name="Scope 2" animationDuration={CHART_ANIMATION_DURATION} />
                <Bar dataKey="scope3" stackId="a" fill="#4A9E71" name="Scope 3" animationDuration={CHART_ANIMATION_DURATION} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Emissions (Pie) */}
        <div className="bg-[var(--card)] p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-serif text-[var(--ink)] mb-6">Emissions by Department</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deptEmissions}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label
                  animationDuration={CHART_ANIMATION_DURATION}
                >
                  {/* Using the core palette for pie charts */}
                  {deptEmissions.map((entry, index) => {
                    const colors = ['#2F6E4E', '#1A402D', '#4A9E71', '#C97A3D'];
                    return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                  })}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '8px', border: '1px solid #E5E7EB', color: 'var(--ink)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: 'var(--muted)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Diversity Distribution */}
        <div className="bg-[var(--card)] p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-serif text-[var(--ink)] mb-6">Diversity Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={diversityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                  animationDuration={CHART_ANIMATION_DURATION}
                >
                  {diversityData.map((entry, index) => {
                    // Social colors for diversity
                    const colors = ['#C97A3D', '#E29A64', '#4A6670'];
                    return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                  })}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '8px', border: '1px solid #E5E7EB', color: 'var(--ink)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: 'var(--muted)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="bg-[var(--card)] rounded-xl border border-gray-200 p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-serif text-[var(--ink)]">Recent Activities</h3>
            <Button variant="ghost" size="sm" onClick={() => alert('View All activities (Demo)')}>View All</Button>
          </div>
          <div className="space-y-4">
            {recentActivities.map(activity => {
              // Map activity type to proper colors
              const isGov = activity.type === 'governance';
              const isEnv = activity.type === 'environmental';
              const iconColor = isGov ? '#4A6670' : isEnv ? '#2F6E4E' : '#C97A3D';
              
              return (
                <div key={activity.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="p-2.5 rounded-full" style={{ backgroundColor: `${iconColor}15`, color: iconColor }}>
                    {isGov ? <ShieldCheck className="w-5 h-5" /> :
                     isEnv ? <Leaf className="w-5 h-5" /> :
                     <Users className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-sans font-medium text-[var(--ink)]">{activity.text}</p>
                    <p className="text-xs font-sans text-[var(--muted)] mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-[var(--card)] rounded-xl border border-gray-200 p-6">
          <h3 className="text-xl font-serif text-[var(--ink)] mb-4">Upcoming Tasks</h3>
          <div className="space-y-4">
            {upcomingTasks.map(task => {
              const priorityColor = task.priority === 'high' ? '#B23B3B' : task.priority === 'medium' ? '#C97A3D' : '#2F6E4E';
              return (
                <div key={task.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5" style={{ color: priorityColor }} />
                    <div>
                      <p className="text-sm font-sans font-medium text-[var(--ink)]">{task.text}</p>
                      <p className="text-xs font-sans text-[var(--muted)]">{task.due}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" icon={ArrowRight} className="!p-1 text-[var(--muted)] hover:text-[var(--ink)]" onClick={() => alert('Task clicked (Demo)')} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
