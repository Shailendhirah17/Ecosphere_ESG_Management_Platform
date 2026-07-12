import React, { useState } from 'react';
import { FileText, Download, Sparkles, Filter, CheckCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Modal from '../components/Modal';

export default function Reports() {
  const [reportType, setReportType] = useState('ESG Summary');
  const [dateRange, setDateRange] = useState('YTD');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSummary, setAiSummary] = useState('');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(`EcoSphere ${reportType}`, 14, 22);
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Date Range: ${dateRange}`, 14, 36);

    if (aiSummary) {
      doc.setFontSize(14);
      doc.text('AI Executive Summary', 14, 46);
      doc.setFontSize(10);
      const splitText = doc.splitTextToSize(aiSummary, 180);
      doc.text(splitText, 14, 52);
    }

    autoTable(doc, {
      startY: aiSummary ? 80 : 45,
      head: [['Metric', 'Value', 'Status']],
      body: [
        ['Total Emissions (tCO2e)', '1,240.5', 'On Track'],
        ['CSR Participation Rate', '68%', 'Needs Improvement'],
        ['Open Compliance Issues', '3', 'Warning'],
        ['Total ESG Score', '78.4', 'Excellent'],
      ],
      theme: 'grid',
      headStyles: { fillColor: [44, 94, 67] } // Forest green
    });

    doc.save(`EcoSphere_${reportType.replace(/ /g, '_')}.pdf`);
  };

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    // Simulate AI Generation since no provider was specified
    setTimeout(() => {
      setAiSummary("Based on the filtered data, the organization has made excellent progress in Environmental goals, tracking 15% below the baseline CO2e emissions for YTD. However, Social metrics indicate a dip in volunteer participation, suggesting a need for new engaging CSR initiatives. Governance remains strong with all critical compliance issues resolved within SLAs.");
      setIsGenerating(false);
      setIsAiModalOpen(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-forest-900 dark:text-ivory tracking-tight mb-2 flex items-center gap-3">
            <div className="p-3 bg-sage-500/10 rounded-2xl text-sage-500">
              <FileText className="w-8 h-8" />
            </div>
            Custom Report Builder
          </h1>
          <p className="text-sage-500">
            Generate and export custom ESG performance reports with AI insights.
          </p>
        </div>
        <button 
          onClick={generatePDF}
          className="flex items-center px-6 py-3 bg-forest-900 dark:bg-ivory text-ivory dark:text-forest-900 font-medium rounded-xl shadow-lg shadow-forest-900/10 hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <Download className="w-5 h-5 mr-2" /> Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Filters Panel */}
        <div className="bg-white dark:bg-ash-900 rounded-3xl p-6 border border-sage-100 dark:border-ash-800 shadow-sm h-fit">
          <h3 className="text-lg font-display font-bold text-forest-900 dark:text-ivory mb-6 flex items-center">
            <Filter className="w-5 h-5 mr-2 text-sage-400" />
            Report Configuration
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-2">Report Template</label>
              <select value={reportType} onChange={e => setReportType(e.target.value)} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-forest-500 outline-none">
                <option>ESG Summary</option>
                <option>Carbon Footprint Audit</option>
                <option>Compliance Status</option>
                <option>Department Scorecard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-forest-900 dark:text-ivory mb-2">Date Range</label>
              <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="w-full p-3 bg-sage-50 dark:bg-ash-950 border border-sage-200 dark:border-ash-800 rounded-xl focus:ring-forest-500 outline-none">
                <option>YTD</option>
                <option>Last Quarter</option>
                <option>Last 12 Months</option>
                <option>Custom Range</option>
              </select>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-ash-900 rounded-3xl p-8 border border-sage-100 dark:border-ash-800 shadow-sm min-h-[400px]">
            <div className="flex justify-between items-start mb-8 border-b border-sage-100 dark:border-ash-800 pb-6">
              <div>
                <h2 className="text-2xl font-display font-bold text-forest-900 dark:text-ivory">{reportType}</h2>
                <p className="text-sage-500 mt-1">{dateRange} • Internal Draft</p>
              </div>
            </div>

            {/* AI Narrative Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-forest-900 dark:text-ivory flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-amber-500" />
                  Executive Summary
                </h4>
                {!aiSummary && (
                  <button 
                    onClick={() => setIsAiModalOpen(true)}
                    className="text-sm font-semibold text-amber-600 bg-amber-50 dark:bg-amber-900/30 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors"
                  >
                    Generate with AI
                  </button>
                )}
              </div>
              
              {aiSummary ? (
                <div className="p-4 bg-sage-50 dark:bg-ash-950 rounded-2xl border border-sage-100 dark:border-ash-800 relative group">
                  <p className="text-sm text-sage-700 dark:text-sage-300 leading-relaxed">
                    {aiSummary}
                  </p>
                  <button 
                    onClick={() => setAiSummary('')}
                    className="absolute top-2 right-2 p-1.5 bg-white dark:bg-ash-800 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium text-sage-500 hover:text-status-critical"
                  >
                    Clear
                  </button>
                  <div className="mt-3 flex items-center gap-1.5 opacity-50">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-sage-500">AI Generated Content</span>
                  </div>
                </div>
              ) : (
                <div className="p-6 border-2 border-dashed border-sage-200 dark:border-ash-800 rounded-2xl flex flex-col items-center justify-center text-sage-400 text-sm">
                  <p>No summary generated yet.</p>
                </div>
              )}
            </div>

            <table className="w-full text-left text-sm text-sage-600 dark:text-sage-400 mt-8">
              <thead className="bg-sage-50/50 dark:bg-ash-800/20 text-xs font-bold uppercase tracking-widest text-sage-500 border-b border-sage-100 dark:border-ash-800">
                <tr>
                  <th className="px-4 py-3">Metric</th>
                  <th className="px-4 py-3 text-right">Value</th>
                  <th className="px-4 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-sage-100 dark:border-ash-800">
                  <td className="px-4 py-3 font-medium text-forest-900 dark:text-ivory">Total Emissions (tCO2e)</td>
                  <td className="px-4 py-3 text-right font-mono">1,240.5</td>
                  <td className="px-4 py-3 text-right text-forest-600 flex items-center justify-end"><CheckCircle className="w-4 h-4 mr-1"/> On Track</td>
                </tr>
                <tr className="border-b border-sage-100 dark:border-ash-800">
                  <td className="px-4 py-3 font-medium text-forest-900 dark:text-ivory">CSR Participation Rate</td>
                  <td className="px-4 py-3 text-right font-mono">68%</td>
                  <td className="px-4 py-3 text-right text-amber-600">Needs Improvement</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-forest-900 dark:text-ivory">Open Compliance Issues</td>
                  <td className="px-4 py-3 text-right font-mono">3</td>
                  <td className="px-4 py-3 text-right text-status-critical">Warning</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} title="Generate AI Narrative">
        <div className="space-y-4">
          <p className="text-sm text-sage-600 dark:text-sage-400">
            The AI will analyze the filtered report data for the selected date range and generate an executive summary highlighting key trends and anomalies.
          </p>
          <div className="pt-4 flex justify-end gap-3">
            <button 
              onClick={() => setIsAiModalOpen(false)}
              className="px-5 py-2.5 text-sage-600 dark:text-sage-400 font-medium hover:bg-sage-100 dark:hover:bg-ash-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="px-5 py-2.5 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 transition-colors disabled:opacity-50 shadow-sm shadow-amber-900/20 flex items-center"
            >
              {isGenerating ? 'Analyzing Data...' : <><Sparkles className="w-4 h-4 mr-2"/> Generate Narrative</>}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
