import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  FileText, CheckSquare, ShieldAlert, AlertTriangle, Download, Upload, Plus
} from 'lucide-react';
import { Card, PageHeader, DataTable, Button, Modal, Input } from '../components/common';
import { useToast } from '../context/ToastContext';

// --- Dummy Data ---
const policies = [
  { id: 'POL-01', name: 'Environmental Compliance 2026', department: 'HQ', version: 'v2.1', owner: 'Alice Smith', effective: '2026-01-01', expiry: '2026-12-31', status: 'Active' },
  { id: 'POL-02', name: 'Anti-Corruption Framework', department: 'Legal', version: 'v1.4', owner: 'Bob Jones', effective: '2025-06-01', expiry: '2026-06-01', status: 'Pending' },
  { id: 'POL-03', name: 'Diversity & Inclusion Policy', department: 'HR', version: 'v3.0', owner: 'Carol White', effective: '2024-01-01', expiry: '2025-12-31', status: 'Expired' },
];

const acknowledgements = [
  { id: 1, employee: 'John Doe', policy: 'Environmental Compliance 2026', date: '2026-01-15', status: 'Completed' },
  { id: 2, employee: 'Jane Smith', policy: 'Environmental Compliance 2026', date: '-', status: 'Pending' },
  { id: 3, employee: 'Mike Johnson', policy: 'Anti-Corruption Framework', date: '2025-06-10', status: 'Completed' },
];

const audits = [
  { id: 'AUD-992', name: 'Annual ISO 14001 Audit', auditor: 'SGS Certification', department: 'Manufacturing', score: '92/100', start: '2026-03-01', end: '2026-03-15', status: 'Completed' },
  { id: 'AUD-993', name: 'Q3 ESG Risk Assessment', auditor: 'Internal Audit Team', department: 'HQ', score: '-', start: '2026-09-01', end: '2026-09-10', status: 'Scheduled' },
  { id: 'AUD-994', name: 'Supplier Compliance Check', auditor: 'Bureau Veritas', department: 'Procurement', score: '65/100', start: '2026-01-05', end: '2026-01-20', status: 'Failed' },
];

const complianceIssues = [
  { id: 'ISS-104', department: 'Manufacturing', severity: 'Critical', assignedTo: 'Plant Manager', due: '2026-07-20', status: 'Open' },
  { id: 'ISS-105', department: 'HQ', severity: 'Medium', assignedTo: 'HR Director', due: '2026-08-01', status: 'Open' },
  { id: 'ISS-101', department: 'Logistics', severity: 'High', assignedTo: 'Fleet Manager', due: '2026-05-15', status: 'Resolved' },
  { id: 'ISS-102', department: 'Procurement', severity: 'Medium', assignedTo: 'Supplier Lead', due: '2026-06-30', status: 'Overdue' },
];

// --- Sub-components ---

function Policies() {
  const { showToast } = useToast();
  const [isModalOpen, setModalOpen] = useState(false);

  const columns = [
    { header: 'Policy Name', accessor: 'name', className: 'font-medium text-gray-900' },
    { header: 'Department', accessor: 'department' },
    { header: 'Version', accessor: 'version' },
    { header: 'Owner', accessor: 'owner' },
    { header: 'Effective Date', accessor: 'effective' },
    { header: 'Expiry Date', accessor: 'expiry' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          row.status === 'Active' ? 'bg-green-100 text-green-800' : 
          row.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
        }`}>
          {row.status}
        </span>
      )
    },
  ];

  return (
    <div>
      <PageHeader 
        title="Policies" 
        breadcrumbs={[{ label: 'Governance' }, { label: 'Policies' }]}
        actions={[
          { label: 'Upload PDF', icon: Upload, variant: 'secondary', onClick: () => alert('Upload PDF started (Demo)') },
          { label: 'New Policy', icon: Plus, variant: 'primary', onClick: () => setModalOpen(true) }
        ]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card title="Total Policies" value="45" icon={FileText} />
        <Card title="Active Policies" value="38" />
        <Card title="Expired" value="4" />
        <Card title="Pending Approval" value="3" />
      </div>

      <DataTable 
        columns={columns} 
        data={policies} 
        searchPlaceholder="Search policies..."
        onSearch={() => {}}
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)}
        title="New Policy"
        footerActions={[
          { label: 'Cancel', onClick: () => setModalOpen(false) },
          { label: 'Create', variant: 'primary', onClick: () => { showToast('Policy created!'); setModalOpen(false); } }
        ]}
      >
        <div className="space-y-4">
          <Input label="Policy Name" />
          <Input label="Department" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Effective Date" type="date" />
            <Input label="Expiry Date" type="date" />
          </div>
        </div>
      </Modal>
    </div>
  );
}

function Acknowledgements() {
  const columns = [
    { header: 'Employee', accessor: 'employee', className: 'font-medium text-gray-900' },
    { header: 'Policy', accessor: 'policy' },
    { header: 'Acknowledgement Date', accessor: 'date' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          row.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      header: 'Action',
      accessor: 'action',
      render: (row) => row.status === 'Pending' ? <Button size="sm" variant="ghost" onClick={() => alert('Send Reminder action triggered (Demo)')}>Send Reminder</Button> : null
    }
  ];

  return (
    <div>
      <PageHeader 
        title="Policy Acknowledgements" 
        breadcrumbs={[{ label: 'Governance' }, { label: 'Acknowledgements' }]}
        actions={[{ label: 'Export', icon: Download, variant: 'secondary', onClick: () => alert('Export started (Demo)') }]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card title="Compliance %" value="94%" icon={CheckSquare} trend="+2%" trendLabel="vs last month" />
        <Card title="Completed" value="1,450" />
        <Card title="Pending" value="92" />
        <Card title="Employees Yet to Read" value="45" />
      </div>

      <DataTable columns={columns} data={acknowledgements} searchPlaceholder="Search employees..." onSearch={() => {}} />
    </div>
  );
}

function Audits() {
  const columns = [
    { header: 'Audit Name', accessor: 'name', className: 'font-medium text-gray-900' },
    { header: 'Auditor', accessor: 'auditor' },
    { header: 'Department', accessor: 'department' },
    { header: 'Score', accessor: 'score' },
    { header: 'Start Date', accessor: 'start' },
    { header: 'End Date', accessor: 'end' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          row.status === 'Completed' ? 'bg-green-100 text-green-800' : 
          row.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
        }`}>
          {row.status}
        </span>
      )
    },
  ];

  return (
    <div>
      <PageHeader title="Audits" breadcrumbs={[{ label: 'Governance' }, { label: 'Audits' }]} />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card title="Completed" value="12" icon={ShieldAlert} />
        <Card title="Scheduled" value="4" />
        <Card title="Pending" value="2" />
        <Card title="Failed" value="1" />
      </div>

      <DataTable columns={columns} data={audits} searchPlaceholder="Search audits..." onSearch={() => {}} />
    </div>
  );
}

function ComplianceIssues() {
  const columns = [
    { header: 'Issue ID', accessor: 'id', className: 'font-medium text-gray-900' },
    { header: 'Department', accessor: 'department' },
    { 
      header: 'Severity', 
      accessor: 'severity',
      render: (row) => (
        <span className={`font-semibold ${
          row.severity === 'Critical' ? 'text-red-600' : 
          row.severity === 'High' ? 'text-orange-500' : 'text-yellow-600'
        }`}>
          {row.severity}
        </span>
      )
    },
    { header: 'Assigned To', accessor: 'assignedTo' },
    { header: 'Due Date', accessor: 'due' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          row.status === 'Resolved' ? 'bg-green-100 text-green-800' : 
          row.status === 'Open' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'action',
      render: () => <Button size="sm" variant="secondary" onClick={() => alert('Resolve action triggered (Demo)')}>Resolve</Button>
    }
  ];

  return (
    <div>
      <PageHeader title="Compliance Issues" breadcrumbs={[{ label: 'Governance' }, { label: 'Compliance Issues' }]} />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card title="Open Issues" value="8" icon={AlertTriangle} />
        <Card title="Critical" value="1" />
        <Card title="Overdue" value="2" />
        <Card title="Resolved" value="145" />
      </div>

      <DataTable columns={columns} data={complianceIssues} searchPlaceholder="Search issues..." onSearch={() => {}} />
    </div>
  );
}

export default function ScoresPage() {
  const location = useLocation();
  const path = location.pathname;

  if (path.includes('policies')) return <div className="p-8"><Policies /></div>;
  if (path.includes('policy-acknowledgements')) return <div className="p-8"><Acknowledgements /></div>;
  if (path.includes('audits')) return <div className="p-8"><Audits /></div>;
  if (path.includes('compliance-issues')) return <div className="p-8"><ComplianceIssues /></div>;

  // Fallback
  return <div className="p-8"><Policies /></div>;
}
