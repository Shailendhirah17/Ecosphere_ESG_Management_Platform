import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { 
  Leaf, Settings, Package, Target, Download, Upload, Plus
} from 'lucide-react';
import { Card, PageHeader, DataTable, Button, Modal, Input } from '../components/common';
import { useToast } from '../context/ToastContext';

// --- Dummy Data ---
const emissionFactors = [
  { id: 1, name: 'Grid Electricity', category: 'Energy', unit: 'kWh', value: '0.453', country: 'US', date: '2025-01-01', status: 'Active' },
  { id: 2, name: 'Natural Gas', category: 'Fuel', unit: 'mmBtu', value: '53.06', country: 'Global', date: '2025-01-01', status: 'Active' },
  { id: 3, name: 'Diesel', category: 'Transport', unit: 'Gallon', value: '10.21', country: 'UK', date: '2025-01-01', status: 'Active' },
  { id: 4, name: 'Commercial Flight', category: 'Travel', unit: 'Passenger Mile', value: '0.133', country: 'Global', date: '2024-06-01', status: 'Archived' },
];

const productProfiles = [
  { id: 'P001', name: 'EcoWidget Pro', sku: 'EW-PRO-01', category: 'Electronics', score: 85, carbon: '12.5 kg', water: '45 L', renewable: '60%' },
  { id: 'P002', name: 'Green Packaging Box', sku: 'GP-BOX-10', category: 'Packaging', score: 92, carbon: '1.2 kg', water: '5 L', renewable: '100%' },
  { id: 'P003', name: 'Smart Thermostat', sku: 'ST-01', category: 'Electronics', score: 78, carbon: '22.0 kg', water: '120 L', renewable: '35%' },
];

const transactions = [
  { id: 'TX-9021', vendor: 'ClimateCare', quantity: 500, price: '$12.50', date: '2026-03-15', status: 'Completed' },
  { id: 'TX-9022', vendor: 'TerraPass', quantity: 1000, price: '$11.00', date: '2026-04-02', status: 'Pending' },
  { id: 'TX-9023', vendor: 'SouthPole', quantity: 250, price: '$14.20', date: '2026-05-20', status: 'Completed' },
];

const goals = [
  { id: 1, name: 'Reduce Scope 2 Emissions', department: 'Facilities', target: '20%', current: '12%', progress: 60, deadline: '2026-12-31', owner: 'Jane Doe', status: 'On Track' },
  { id: 2, name: 'Zero Waste to Landfill', department: 'Manufacturing', target: '100%', current: '85%', progress: 85, deadline: '2026-09-30', owner: 'John Smith', status: 'On Track' },
  { id: 3, name: 'Switch to Renewable Energy', department: 'HQ', target: '100%', current: '40%', progress: 40, deadline: '2026-12-31', owner: 'Alice Johnson', status: 'Delayed' },
];

const transactionData = [
  { month: 'Jan', purchased: 1000, retired: 400 },
  { month: 'Feb', purchased: 0, retired: 200 },
  { month: 'Mar', purchased: 500, retired: 300 },
  { month: 'Apr', purchased: 1000, retired: 500 },
  { month: 'May', purchased: 250, retired: 250 },
];

// --- Sub-components for each section ---

function EmissionFactors() {
  const { showToast } = useToast();
  const [isModalOpen, setModalOpen] = useState(false);

  const columns = [
    { header: 'Factor Name', accessor: 'name', className: 'font-medium text-gray-900' },
    { header: 'Category', accessor: 'category' },
    { header: 'Unit', accessor: 'unit' },
    { header: 'CO₂e Value', accessor: 'value' },
    { header: 'Country', accessor: 'country' },
    { header: 'Effective Date', accessor: 'date' },
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
        title="Emission Factors" 
        breadcrumbs={[{ label: 'Environmental' }, { label: 'Emission Factors' }]}
        actions={[
          { label: 'Import', icon: Upload, variant: 'secondary', onClick: () => alert('Import started (Demo)') },
          { label: 'Export', icon: Download, variant: 'secondary', onClick: () => alert('Export started (Demo)') },
          { label: 'Add Factor', icon: Plus, variant: 'primary', onClick: () => setModalOpen(true) }
        ]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card title="Total Factors" value="142" icon={Settings} />
        <Card title="Active Factors" value="128" icon={Leaf} />
        <Card title="Countries Covered" value="45" />
        <Card title="Last Updated" value="Today" />
      </div>

      <DataTable 
        columns={columns} 
        data={emissionFactors} 
        searchPlaceholder="Search factors by name or country..."
        onSearch={() => {}}
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)}
        title="Add Emission Factor"
        footerActions={[
          { label: 'Cancel', onClick: () => setModalOpen(false) },
          { label: 'Save Factor', variant: 'primary', onClick: () => { showToast('Factor added successfully!'); setModalOpen(false); } }
        ]}
      >
        <div className="space-y-4">
          <Input label="Factor Name" placeholder="e.g. Grid Electricity" />
          <Input label="Category" placeholder="e.g. Energy" />
          <Input label="Unit" placeholder="e.g. kWh" />
          <Input label="CO₂e Value" type="number" />
          <Input label="Country" placeholder="e.g. US" />
        </div>
      </Modal>
    </div>
  );
}

function ProductProfiles() {
  const columns = [
    { header: 'Product Name', accessor: 'name', className: 'font-medium text-gray-900' },
    { header: 'SKU', accessor: 'sku' },
    { header: 'Category', accessor: 'category' },
    { 
      header: 'ESG Score', 
      accessor: 'score',
      render: (row) => (
        <span className={`font-bold ${row.score >= 80 ? 'text-green-600' : 'text-yellow-600'}`}>
          {row.score}/100
        </span>
      )
    },
    { header: 'Carbon Footprint', accessor: 'carbon' },
    { header: 'Water Usage', accessor: 'water' },
    { header: 'Renewable %', accessor: 'renewable' },
  ];

  return (
    <div>
      <PageHeader 
        title="Product ESG Profiles" 
        breadcrumbs={[{ label: 'Environmental' }, { label: 'Product Profiles' }]}
        actions={[{ label: 'New Product Profile', icon: Plus, variant: 'primary', onClick: () => alert('New Product Profile started (Demo)') }]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card title="Total Products" value="84" icon={Package} />
        <Card title="Avg ESG Score" value="76/100" />
        <Card title="Certified Products" value="42" />
        <Card title="High Carbon Products" value="12" />
      </div>

      <DataTable 
        columns={columns} 
        data={productProfiles} 
        searchPlaceholder="Search products by SKU or Name..."
        onSearch={() => {}}
      />
    </div>
  );
}

function CarbonTransactions() {
  const columns = [
    { header: 'Transaction ID', accessor: 'id', className: 'font-medium text-gray-900' },
    { header: 'Vendor', accessor: 'vendor' },
    { header: 'Quantity (tCO2e)', accessor: 'quantity' },
    { header: 'Price per ton', accessor: 'price' },
    { header: 'Date', accessor: 'date' },
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
  ];

  return (
    <div>
      <PageHeader 
        title="Carbon Transactions" 
        breadcrumbs={[{ label: 'Environmental' }, { label: 'Carbon Transactions' }]}
        actions={[
          { label: 'Upload Certificate', icon: Upload, variant: 'secondary', onClick: () => alert('Upload Certificate started (Demo)') },
          { label: 'Buy Credits', icon: Plus, variant: 'primary', onClick: () => alert('Buy Credits started (Demo)') }
        ]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card title="Purchased Credits" value="12,400" />
        <Card title="Sold Credits" value="500" />
        <Card title="Available Credits" value="2,500" />
        <Card title="Retired Credits" value="9,400" />
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
        <h3 className="text-lg font-semibold mb-4">Monthly Carbon Credit Transactions</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={transactionData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="purchased" fill="#10b981" name="Purchased" />
              <Bar dataKey="retired" fill="#f59e0b" name="Retired" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={transactions} 
        searchPlaceholder="Search transactions..."
        onSearch={() => {}}
      />
    </div>
  );
}

function EnvironmentalGoals() {
  const columns = [
    { header: 'Goal Name', accessor: 'name', className: 'font-medium text-gray-900' },
    { header: 'Department', accessor: 'department' },
    { 
      header: 'Progress', 
      accessor: 'progress',
      render: (row) => (
        <div className="w-full max-w-[200px] flex items-center gap-2">
          <div className="flex-grow bg-gray-200 rounded-full h-2.5">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${row.progress}%` }}></div>
          </div>
          <span className="text-xs text-gray-500 w-8">{row.progress}%</span>
        </div>
      )
    },
    { header: 'Target', accessor: 'target' },
    { header: 'Current', accessor: 'current' },
    { header: 'Deadline', accessor: 'deadline' },
    { header: 'Owner', accessor: 'owner' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          row.status === 'On Track' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {row.status}
        </span>
      )
    },
  ];

  return (
    <div>
      <PageHeader 
        title="Environmental Goals" 
        breadcrumbs={[{ label: 'Environmental' }, { label: 'Goals' }]}
        actions={[{ label: 'Create Goal', icon: Target, variant: 'primary', onClick: () => alert('Create Goal started (Demo)') }]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card title="Active Goals" value="12" icon={Target} />
        <Card title="Completed Goals" value="34" />
        <Card title="Delayed Goals" value="2" />
        <Card title="Upcoming Goals" value="5" />
      </div>

      <DataTable 
        columns={columns} 
        data={goals} 
        searchPlaceholder="Search goals..."
        onSearch={() => {}}
      />
    </div>
  );
}

export default function EmissionsPage() {
  const location = useLocation();
  const path = location.pathname;

  if (path.includes('emission-factors')) return <div className="p-8"><EmissionFactors /></div>;
  if (path.includes('product-profiles')) return <div className="p-8"><ProductProfiles /></div>;
  if (path.includes('carbon-transactions')) return <div className="p-8"><CarbonTransactions /></div>;
  if (path.includes('environmental-goals')) return <div className="p-8"><EnvironmentalGoals /></div>;

  // Fallback if just /environmental
  return <div className="p-8"><EmissionFactors /></div>;
}
