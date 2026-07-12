import React from 'react';
import { motion } from 'framer-motion';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon: Icon,
  disabled,
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 shadow-sm';
  
  const variants = {
    primary: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-500/20 focus:ring-emerald-500 border border-transparent',
    secondary: 'bg-white/80 backdrop-blur-md hover:bg-white text-slate-700 border border-slate-200 shadow-slate-200/50 hover:shadow-md focus:ring-emerald-500',
    danger: 'bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white shadow-rose-500/20 focus:ring-rose-500 border border-transparent',
    ghost: 'bg-transparent hover:bg-slate-100/50 text-slate-600 focus:ring-slate-400 border border-transparent shadow-none hover:shadow-none hover:scale-100 active:scale-95'
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon className={`w-4 h-4 ${children ? 'mr-2.5' : ''} transition-transform group-hover:scale-110`} />}
      {children}
    </motion.button>
  );
}
