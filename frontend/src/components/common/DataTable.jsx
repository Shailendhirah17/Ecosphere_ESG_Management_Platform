import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, Upload, ChevronLeft, ChevronRight, FileX } from 'lucide-react';
import Input from './Input';
import Button from './Button';

export default function DataTable({ 
  columns, 
  data, 
  isLoading, 
  onSearch,
  onImport,
  onExport,
  searchPlaceholder = 'Search...',
  emptyTitle = 'No data found',
  emptyMessage = 'There are no records to display at this time.',
  pagination = {
    currentPage: 1,
    totalPages: 1,
    onPageChange: () => {},
    totalItems: 0
  }
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden flex flex-col"
    >
      {/* Toolbar */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
        <div className="w-full sm:max-w-md">
          {onSearch && (
            <Input 
              icon={Search}
              placeholder={searchPlaceholder}
              onChange={(e) => onSearch(e.target.value)}
            />
          )}
        </div>
        <div className="flex items-center gap-3">
          {onImport && (
            <Button variant="secondary" icon={Upload} onClick={onImport} size="sm">
              Import
            </Button>
          )}
          {onExport && (
            <Button variant="secondary" icon={Download} onClick={onExport} size="sm">
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full custom-scrollbar">
        <table className="w-full text-left text-sm text-slate-600 whitespace-nowrap min-w-max">
          <thead className="bg-slate-50/80 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className={`px-6 py-4 border-b border-slate-100 ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-transparent">
            {isLoading ? (
              // Loading State
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  {columns.map((col, colIdx) => (
                     <td key={colIdx} className="px-6 py-5">
                       <div className="h-4 bg-slate-200/50 rounded-full w-3/4"></div>
                     </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan={columns.length} className="px-6 py-16 text-center">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center text-slate-400">
                    <div className="p-4 bg-slate-50 rounded-full mb-4 border border-slate-100">
                      <FileX className="w-10 h-10 text-slate-300" />
                    </div>
                    <p className="text-lg font-semibold text-slate-700">{emptyTitle}</p>
                    <p className="mt-1">{emptyMessage}</p>
                  </motion.div>
                </td>
              </tr>
            ) : (
              // Data Rows
              <AnimatePresence>
                {data.map((row, rowIdx) => (
                  <motion.tr 
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: rowIdx * 0.05 }}
                    key={rowIdx} 
                    className="hover:bg-slate-50/80 transition-colors duration-200 group"
                  >
                    {columns.map((col, colIdx) => (
                      <td key={colIdx} className={`px-6 py-5 ${col.cellClassName || ''}`}>
                        {col.render ? col.render(row) : row[col.accessor]}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!isLoading && data.length > 0 && pagination && (
        <div className="p-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-700">{(pagination.currentPage - 1) * 10 + 1}</span> to <span className="font-semibold text-slate-700">{Math.min(pagination.currentPage * 10, pagination.totalItems || data.length)}</span> of <span className="font-semibold text-slate-700">{pagination.totalItems || data.length}</span> results
          </p>
          <div className="flex items-center gap-2 bg-white rounded-xl shadow-sm border border-slate-200 p-1">
            <button
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 disabled:opacity-50 transition-colors"
              disabled={pagination.currentPage === 1}
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="px-3 text-sm font-medium text-slate-700">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 disabled:opacity-50 transition-colors"
              disabled={pagination.currentPage === pagination.totalPages}
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
