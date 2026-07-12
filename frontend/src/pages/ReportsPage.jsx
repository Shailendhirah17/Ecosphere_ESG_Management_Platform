import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  FileText, Download, LayoutTemplate, PieChart, BarChart
} from 'lucide-react';
import { PageHeader, Card, Button } from '../components/common';

function EnvironmentalReport() {
  return (
    <div>
      <PageHeader 
        title="Environmental Report" 
        breadcrumbs={[{ label: 'Reports' }, { label: 'Environmental' }]}
        actions={[
          { label: 'Export PDF', icon: Download, variant: 'primary', onClick: () => alert('Export PDF started (Demo)') },
          { label: 'Export Excel', icon: Download, variant: 'secondary', onClick: () => alert('Export Excel started (Demo)') }
        ]}
      />
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center">
        <PieChart className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Environmental Summary</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">This report provides a comprehensive summary of carbon emissions, energy usage, water consumption, and waste analysis generated from the Environmental module. Export to view detailed charts and historical trends.</p>
      </div>
    </div>
  );
}

function SocialReport() {
  return (
    <div>
      <PageHeader 
        title="Social Report" 
        breadcrumbs={[{ label: 'Reports' }, { label: 'Social' }]}
        actions={[
          { label: 'Export PDF', icon: Download, variant: 'primary', onClick: () => alert('Export PDF started (Demo)') },
          { label: 'Export Excel', icon: Download, variant: 'secondary', onClick: () => alert('Export Excel started (Demo)') }
        ]}
      />
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center">
        <BarChart className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Social Summary</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">Analyze CSR activity impact, diversity metrics, and employee participation across different demographics. Export to view detailed graphs and participation analytics.</p>
      </div>
    </div>
  );
}

function GovernanceReport() {
  return (
    <div>
      <PageHeader 
        title="Governance Report" 
        breadcrumbs={[{ label: 'Reports' }, { label: 'Governance' }]}
        actions={[
          { label: 'Export PDF', icon: Download, variant: 'primary', onClick: () => alert('Export PDF started (Demo)') },
          { label: 'Export Excel', icon: Download, variant: 'secondary', onClick: () => alert('Export Excel started (Demo)') }
        ]}
      />
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center">
        <FileText className="w-16 h-16 text-purple-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Governance Summary</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">Review policy compliance, audit results, and resolved compliance issues over the selected period. Export for the full compliance matrix and risk analysis.</p>
      </div>
    </div>
  );
}

function EsgSummary() {
  return (
    <div>
      <PageHeader 
        title="ESG Summary Report" 
        breadcrumbs={[{ label: 'Reports' }, { label: 'ESG Summary' }]}
        actions={[{ label: 'Export Executive PDF', icon: Download, variant: 'primary', onClick: () => alert('Export Executive PDF started (Demo)') }]}
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card title="Overall Score" value="82" />
        <Card title="Environmental" value="78" />
        <Card title="Social" value="85" />
        <Card title="Governance" value="94" />
      </div>
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold mb-4">Executive Summary</h3>
        <p className="text-gray-600 mb-4">The company has shown strong performance in Governance and Social metrics over the last quarter. Environmental metrics, specifically Scope 3 emissions, require additional optimization strategies to meet the 2030 targets.</p>
        <h4 className="font-semibold mt-6 mb-2">Key Recommendations:</h4>
        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>Accelerate supply chain audit implementation to reduce Scope 3 emissions.</li>
          <li>Increase CSR budget allocation for next fiscal year due to high employee participation rates.</li>
          <li>Review and update the expiring Diversity & Inclusion policy before Q4.</li>
        </ul>
      </div>
    </div>
  );
}

function CustomReportBuilder() {
  return (
    <div>
      <PageHeader 
        title="Custom Report Builder" 
        breadcrumbs={[{ label: 'Reports' }, { label: 'Report Builder' }]}
        actions={[
          { label: 'Save Template', variant: 'secondary' },
          { label: 'Generate Report', icon: LayoutTemplate, variant: 'primary', onClick: () => alert('Generate Report started (Demo)') }
        ]}
      />
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center flex flex-col items-center justify-center">
        <LayoutTemplate className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">Drag and Drop Widgets Here</h3>
        <p className="text-gray-500">Select KPIs, Charts, and Tables from the sidebar to build your custom report.</p>
      </div>
    </div>
  );
}

export default function ReportsPage() {
  const location = useLocation();
  const path = location.pathname;

  if (path.includes('environmental')) return <div className="p-8"><EnvironmentalReport /></div>;
  if (path.includes('social')) return <div className="p-8"><SocialReport /></div>;
  if (path.includes('governance')) return <div className="p-8"><GovernanceReport /></div>;
  if (path.includes('esg-summary')) return <div className="p-8"><EsgSummary /></div>;
  if (path.includes('custom-report')) return <div className="p-8"><CustomReportBuilder /></div>;

  return <div className="p-8"><EsgSummary /></div>;
}
