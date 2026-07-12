import React from 'react';
import { motion } from 'framer-motion';

export default function Input({ 
  label, 
  error, 
  helperText, 
  id, 
  className = '', 
  type = 'text',
  icon: Icon,
  ...props 
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-semibold text-slate-700 mb-1.5"
        >
          {label}
        </label>
      )}
      
      <div className="relative group">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
            <Icon className="h-5 w-5" />
          </div>
        )}
        
        <input
          type={type}
          id={inputId}
          className={`
            block w-full rounded-xl sm:text-sm transition-all duration-200 bg-white/50 backdrop-blur-sm
            ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5
            ${error 
              ? 'border-rose-300 text-rose-900 placeholder-rose-300 focus:ring-rose-500 focus:border-rose-500' 
              : 'border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-emerald-500 focus:border-emerald-500 hover:border-slate-300 shadow-sm'
            }
            border focus:outline-none focus:ring-2 focus:ring-opacity-20
          `}
          {...props}
        />
      </div>

      {error && (
        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-sm text-rose-600" id={`${inputId}-error`}>
          {error}
        </motion.p>
      )}
      
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-slate-500" id={`${inputId}-description`}>
          {helperText}
        </p>
      )}
    </motion.div>
  );
}
