import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell
} from 'recharts';
import { 
  Users, Target, Download, Upload, Plus, Shield
} from 'lucide-react';
import { Card, PageHeader, DataTable, Button, Modal, Input } from '../components/common';
import { useToast } from '../context/ToastContext';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

// --- Dummy Data ---
const csrProjects = [
  { id: 1, name: 'Local Park Clean-up', location: 'New York', budget: '$5,000', participants: 45, start: '2026-06-01', end: '2026-06-02', status: 'Completed' },
  { id: 2, name: 'Stem Education Drive', location: 'London', budget: '$12,000', participants: 120, start: '2026-07-15', end: '2026-07-20', status: 'Active' },
  { id: 3, name: 'Tree Planting', location: 'Seattle', budget: '$8,000', participants: 200, start: '2026-08-10', end: '2026-08-15', status: 'Upcoming' },
];

const participations = [
  { id: 1, employee: 'Jane Doe', department: 'IT', activity: 'Local Park Clean-up', hours: 8, points: 150, badge: 'Eco Warrior', status: 'Approved' },
  { id: 2, employee: 'John Smith', department: 'HR', activity: 'Stem Education Drive', hours: 12, points: 250, badge: 'Mentor', status: 'Approved' },
  { id: 3, employee: 'Alice Johnson', department: 'Manufacturing', activity: 'Tree Planting', hours: 5, points: 100, badge: '-', status: 'Pending' },
];

const participationTrend = [
  { month: 'Jan', participants: 40, hours: 120 },
  { month: 'Feb', participants: 45, hours: 140 },
  { month: 'Mar', participants: 60, hours: 200 },
  { month: 'Apr', participants: 55, hours: 180 },
  { month: 'May', participants: 80, hours: 300 },
  { month: 'Jun', participants: 120, hours: 450 },
];

const genderData = [
  { name: 'Female', value: 45 },
  { name: 'Male', value: 52 },
  { name: 'Other', value: 3 },
];

const ageData = [
  { name: '18-25', value: 15 },
  { name: '26-35', value: 45 },
  { name: '36-45', value: 25 },
  { name: '46-55', value: 10 },
  { name: '55+', value: 5 },
];

const leadershipData = [
  { name: 'Female Leadership', value: 38 },
  { name: 'Male Leadership', value: 62 },
];

// --- Sub-components for each section ---

function CsrActivities() {
  const { showToast } = useToast();
  const [isModalOpen, setModalOpen] = useState(false);

  const columns = [
    { header: 'Project Name', accessor: 'name', className: 'font-medium text-gray-900' },
    { header: 'Location', accessor: 'location' },
    { header: 'Budget', accessor: 'budget' },
    { header: 'Participants', accessor: 'participants' },
    { header: 'Start Date', accessor: 'start' },
    { header: 'End Date', accessor: 'end' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          row.status === 'Completed' ? 'bg-green-100 text-green-800' : 
          row.status === 'Active' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {row.status}
        </span>
      )
    },
  ];

  return (
    <div>
      <PageHeader 
        title="CSR Activities" 
        breadcrumbs={[{ label: 'Social' }, { label: 'CSR Activities' }]}
        actions={[
          { label: 'Export', icon: Download, variant: 'secondary', onClick: () => alert('Export started (Demo)') },
          { label: 'Create Project', icon: Plus, variant: 'primary', onClick: () => setModalOpen(true) }
        ]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card title="Total CSR Projects" value="24" icon={Target} />
        <Card title="Budget Used" value="$45,200" />
        <Card title="Volunteer Hours" value="1,240" />
        <Card title="Beneficiaries" value="15k+" icon={Users} />
      </div>

      <DataTable 
        columns={columns} 
        data={csrProjects} 
        searchPlaceholder="Search projects..."
        onSearch={() => {}}
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)}
        title="Create CSR Project"
        footerActions={[
          { label: 'Cancel', onClick: () => setModalOpen(false) },
          { label: 'Create Project', variant: 'primary', onClick: () => { showToast('Project created successfully!'); setModalOpen(false); } }
        ]}
      >
        <div className="space-y-4">
          <Input label="Project Name" placeholder="e.g. Tree Planting" />
          <Input label="Location" placeholder="e.g. Seattle" />
          <Input label="Budget" type="number" placeholder="e.g. 5000" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" type="date" />
            <Input label="End Date" type="date" />
          </div>
        </div>
      </Modal>
    </div>
  );
}

function EmployeeParticipation() {
  const columns = [
    { header: 'Employee', accessor: 'employee', className: 'font-medium text-gray-900' },
    { header: 'Department', accessor: 'department' },
    { header: 'Activity', accessor: 'activity' },
    { header: 'Hours', accessor: 'hours' },
    { header: 'Points Earned', accessor: 'points' },
    { 
      header: 'Badge', 
      accessor: 'badge',
      render: (row) => (
        row.badge !== '-' ? (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
            {row.badge}
          </span>
        ) : '-'
      )
    },
    { header: 'Status', accessor: 'status' },
  ];

  return (
    <div>
      <PageHeader 
        title="Employee Participation" 
        breadcrumbs={[{ label: 'Social' }, { label: 'Employee Participation' }]}
        actions={[{ label: 'Export Data', icon: Download, variant: 'secondary', onClick: () => alert('Export Data started (Demo)') }]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card title="Total Participants" value="450" icon={Users} />
        <Card title="Volunteer Hours" value="1,240" />
        <Card title="Activities Completed" value="89" />
        <Card title="Reward Points Issued" value="45k" />
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
        <h3 className="text-lg font-semibold mb-4">Participation Trend</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={participationTrend}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="participants" stroke="#3b82f6" strokeWidth={2} name="Participants" />
              <Line type="monotone" dataKey="hours" stroke="#10b981" strokeWidth={2} name="Hours Logged" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={participations} 
        searchPlaceholder="Search employees..."
        onSearch={() => {}}
      />
    </div>
  );
}

function DiversityDashboard() {
  return (
    <div>
      <PageHeader 
        title="Diversity Analytics" 
        breadcrumbs={[{ label: 'Social' }, { label: 'Diversity Dashboard' }]}
        actions={[{ label: 'Download Report', icon: Download, variant: 'secondary', onClick: () => alert('Download Report started (Demo)') }]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Card title="Female %" value="45%" />
        <Card title="Male %" value="52%" />
        <Card title="Other %" value="3%" />
        <Card title="Nationalities" value="24" />
        <Card title="Accessibility Index" value="92/100" icon={Shield} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Gender Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={genderData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Age Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" name="Percentage %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Leadership Diversity</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={leadershipData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label>
                  {leadershipData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SocialPage() {
  const location = useLocation();
  const path = location.pathname;

  if (path.includes('csr-activities')) return <div className="p-8"><CsrActivities /></div>;
  if (path.includes('employee-participation')) return <div className="p-8"><EmployeeParticipation /></div>;
  if (path.includes('diversity-dashboard')) return <div className="p-8"><DiversityDashboard /></div>;

  // Fallback
  return <div className="p-8"><CsrActivities /></div>;
}
