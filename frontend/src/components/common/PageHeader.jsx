import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';

export default function PageHeader({ 
  title, 
  breadcrumbs = [], 
  actions = [] 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
    >
      <div>
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800 tracking-tight">
          {title}
        </h1>
        {breadcrumbs.length > 0 && (
          <nav className="flex mt-2.5" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-slate-500 font-medium">
              {breadcrumbs.map((item, index) => (
                <li key={item.label} className="flex items-center">
                  {index > 0 && <ChevronRight className="w-4 h-4 mx-1.5 text-slate-300 flex-shrink-0" />}
                  {item.path ? (
                    <Link to={item.path} className="hover:text-emerald-600 transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-slate-800 font-semibold">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
      {actions.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap items-center gap-3"
        >
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || 'primary'}
              icon={action.icon}
              onClick={action.onClick}
              disabled={action.disabled}
            >
              {action.label}
            </Button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
