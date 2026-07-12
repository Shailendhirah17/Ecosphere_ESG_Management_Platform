import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Button from './Button';

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footerActions = [],
  size = 'md' 
}) {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[90vw]'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:p-6 overflow-y-auto">
          {/* Blurred Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal Panel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] border border-white/50 w-full ${sizes[size]} flex flex-col max-h-[90vh]`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 flex-shrink-0">
              <h3 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h3>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full focus:outline-none transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-8 py-6 overflow-y-auto custom-scrollbar flex-grow">
              {children}
            </div>

            {/* Footer */}
            {footerActions.length > 0 && (
              <div className="px-8 py-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3 rounded-b-3xl flex-shrink-0">
                {footerActions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || 'secondary'}
                    onClick={action.onClick}
                    disabled={action.disabled}
                    type={action.type || 'button'}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
