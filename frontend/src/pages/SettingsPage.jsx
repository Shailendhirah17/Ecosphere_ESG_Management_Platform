import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Building, LayoutGrid, Sliders, Bell, Plus, Save
} from 'lucide-react';
import { PageHeader, DataTable, Input, Button, Modal, Card } from '../components/common';
import { useToast } from '../context/ToastContext';

// --- Dummy Data ---
const departments = [
  { id: 1, name: 'Manufacturing', manager: 'John Doe', count: 450, location: 'New York', status: 'Active' },
  { id: 2, name: 'IT', manager: 'Jane Smith', count: 120, location: 'San Francisco', status: 'Active' },
  { id: 3, name: 'Logistics', manager: 'Alice Johnson', count: 300, location: 'Chicago', status: 'Active' },
  { id: 4, name: 'HQ', manager: 'Bob Wilson', count: 50, location: 'London', status: 'Inactive' },
];

const categories = [
  { id: 1, type: 'Environmental', name: 'Energy Consumption', status: 'Active' },
  { id: 2, type: 'Environmental', name: 'Waste Management', status: 'Active' },
  { id: 3, type: 'Social', name: 'Community Engagement', status: 'Active' },
  { id: 4, type: 'Governance', name: 'Ethical Conduct', status: 'Active' },
];

function Departments() {
  const { showToast } = useToast();
  const [isModalOpen, setModalOpen] = useState(false);

  const columns = [
    { header: 'Department Name', accessor: 'name', className: 'font-medium text-gray-900' },
    { header: 'Manager', accessor: 'manager' },
    { header: 'Employee Count', accessor: 'count' },
    { header: 'Location', accessor: 'location' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {row.status}
        </span>
      )
    },
  ];

  return (
    <div>
      <PageHeader 
        title="Departments" 
        breadcrumbs={[{ label: 'Settings' }, { label: 'Departments' }]}
        actions={[{ label: 'Add Department', icon: Plus, variant: 'primary', onClick: () => setModalOpen(true) }]}
      />
      <DataTable columns={columns} data={departments} searchPlaceholder="Search departments..." />
      
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Add Department" footerActions={[
        { label: 'Cancel', onClick: () => setModalOpen(false) },
        { label: 'Save', variant: 'primary', onClick: () => { showToast('Saved!'); setModalOpen(false); } }
      ]}>
        <div className="space-y-4">
          <Input label="Department Name" />
          <Input label="Manager Name" />
          <Input label="Location" />
        </div>
      </Modal>
    </div>
  );
}

function Categories() {
  const { showToast } = useToast();
  const [isModalOpen, setModalOpen] = useState(false);

  const columns = [
    { header: 'Category Name', accessor: 'name', className: 'font-medium text-gray-900' },
    { header: 'Type', accessor: 'type' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {row.status}
        </span>
      )
    },
  ];

  return (
    <div>
      <PageHeader 
        title="Categories" 
        breadcrumbs={[{ label: 'Settings' }, { label: 'Categories' }]}
        actions={[{ label: 'Add Category', icon: Plus, variant: 'primary', onClick: () => setModalOpen(true) }]}
      />
      <DataTable columns={columns} data={categories} searchPlaceholder="Search categories..." />
      
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Add Category" footerActions={[
        { label: 'Cancel', onClick: () => setModalOpen(false) },
        { label: 'Save', variant: 'primary', onClick: () => { showToast('Saved!'); setModalOpen(false); } }
      ]}>
        <div className="space-y-4">
          <Input label="Category Name" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-2 px-3 border">
              <option>Environmental</option>
              <option>Social</option>
              <option>Governance</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function ESGConfig() {
  const { showToast } = useToast();
  
  return (
    <div className="max-w-3xl">
      <PageHeader title="ESG Configuration" breadcrumbs={[{ label: 'Settings' }, { label: 'ESG Config' }]} />
      
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
        <h3 className="text-lg font-bold border-b pb-2">General Settings</h3>
        <Input label="Company Name" defaultValue="EcoCorp Ltd" />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Reporting Framework</label>
          <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-2 px-3 border">
            <option>GRI (Global Reporting Initiative)</option>
            <option>SASB</option>
            <option>BRSR</option>
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Financial Year Start</label>
            <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-2 px-3 border">
              <option>January 1st</option>
              <option>April 1st</option>
            </select>
          </div>
          <Input label="Currency" defaultValue="USD ($)" />
        </div>

        <h3 className="text-lg font-bold border-b pb-2 pt-4">Environmental Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Emission Unit" defaultValue="tCO2e" />
          <Input label="Carbon Formula" defaultValue="Activity Data × Emission Factor" disabled />
        </div>

        <div className="pt-4 flex justify-end">
          <Button icon={Save} onClick={() => showToast('Configuration saved!')}>Save Configuration</Button>
        </div>
      </div>
    </div>
  );
}

function NotificationSettings() {
  const { showToast } = useToast();
  
  const notifs = [
    { label: 'Email Notifications', desc: 'Receive daily digests via email.' },
    { label: 'Push Notifications', desc: 'Receive instant alerts in browser.' },
    { label: 'Policy Reminders', desc: 'Remind users to sign pending policies.' },
    { label: 'Audit Alerts', desc: 'Alert admins of upcoming scheduled audits.' },
    { label: 'Weekly Summary', desc: 'Automated weekly ESG performance report.' }
  ];

  return (
    <div className="max-w-3xl">
      <PageHeader title="Notification Settings" breadcrumbs={[{ label: 'Settings' }, { label: 'Notifications' }]} />
      
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {notifs.map((n, idx) => (
            <li key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div>
                <p className="font-medium text-gray-900">{n.label}</p>
                <p className="text-sm text-gray-500">{n.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={idx % 2 === 0} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </li>
          ))}
        </ul>
        <div className="p-4 border-t bg-gray-50 flex justify-end">
          <Button icon={Save} onClick={() => showToast('Settings saved!')}>Save Preferences</Button>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const location = useLocation();
  const path = location.pathname;

  if (path.includes('departments')) return <div className="p-8"><Departments /></div>;
  if (path.includes('categories')) return <div className="p-8"><Categories /></div>;
  if (path.includes('esg-configuration')) return <div className="p-8"><ESGConfig /></div>;
  if (path.includes('notification-settings')) return <div className="p-8"><NotificationSettings /></div>;

  return <div className="p-8"><ESGConfig /></div>;
}
