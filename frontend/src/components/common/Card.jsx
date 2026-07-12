import React, { useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion';

// A smart counter that extracts the number from a string, animates it, and preserves prefixes/suffixes
const CountUpValue = ({ value, delay }) => {
  const nodeRef = useRef();
  
  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !value) return;

    // Simple regex to extract prefix, number (with optional commas/decimals), suffix
    const match = String(value).match(/^([^\d]*)(\d[,\d]*\.?\d*)(.*)$/);
    if (!match) return;

    const [_, prefix, numStr, suffix] = match;
    const isFloat = numStr.includes('.');
    const numericValue = parseFloat(numStr.replace(/,/g, ''));
    
    if (isNaN(numericValue)) return;

    const node = nodeRef.current;
    
    // Start count up animation
    const controls = animate(0, numericValue, {
      duration: 1.2,
      delay: delay,
      ease: "easeOut",
      onUpdate(v) {
        if (!node) return;
        const formattedNum = isFloat 
          ? v.toFixed(1) 
          : Math.floor(v).toLocaleString();
        // Clear text before setting to avoid appending
        node.textContent = `${prefix}${formattedNum}${suffix}`;
      },
      onComplete() {
         if(node) node.textContent = value; // ensure final exact string
      }
    });

    return () => controls.stop();
  }, [value, delay]);

  // Initially render an empty/fallback state for the number if we plan to animate, 
  // but to avoid hydration jumps or empty flashes, we render the full value 
  // and let the animation immediately take over.
  return <span ref={nodeRef}>{value}</span>;
};

export default function Card({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendLabel, 
  className = '', 
  index = 0,
  category = 'default' 
}) {
  // Map category to color variables
  const categoryStyles = {
    env: {
      color: 'var(--chart-env)',
      borderClass: 'border-l-[3px]'
    },
    social: {
      color: 'var(--chart-social)',
      borderClass: 'border-l-[3px]'
    },
    gov: {
      color: 'var(--chart-gov)',
      borderClass: 'border-l-[3px]'
    },
    alert: {
      color: 'var(--chart-alert)',
      borderClass: 'border-l-[3px]'
    },
    default: {
      color: 'var(--muted)',
      borderClass: 'border-l-0'
    }
  };

  const styleConfig = categoryStyles[category] || categoryStyles.default;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }} // Staggered entry
      className={`relative bg-[var(--card)] rounded-lg p-5 flex flex-col justify-between ${styleConfig.borderClass} ${className}`}
      style={{ 
        borderStyle: 'solid', 
        borderColor: 'var(--muted)', // General 1px hairline border
        borderLeftColor: category !== 'default' ? styleConfig.color : undefined,
        borderWidth: category !== 'default' ? '1px 1px 1px 3px' : '1px',
        boxShadow: 'none' // Explicitly no heavy drop shadow per spec
      }}
    >
      <div className="flex items-start justify-between mb-4">
        {/* Label: small, letter-spaced uppercase, muted color */}
        <p className="text-[11px] font-sans font-semibold uppercase tracking-widest text-[var(--muted)] leading-tight max-w-[80%]">
          {title}
        </p>
        
        {/* Icon: monoline, tinted to match category */}
        {Icon && (
          <div className="flex-shrink-0" style={{ color: styleConfig.color }}>
            <Icon size={18} strokeWidth={1.5} />
          </div>
        )}
      </div>
      
      <div>
        {/* Value: Large, Display Serif font */}
        <p className="text-4xl font-serif text-[var(--ink)] tracking-tight">
          <CountUpValue value={value} delay={index * 0.08} />
        </p>
        
        {(trend || trendLabel) && (
          <div className="mt-3 flex items-center text-xs font-sans">
            {trend && (
              <span 
                className="font-medium mr-1.5"
                style={{ color: trend.startsWith('+') ? 'var(--chart-env)' : 'var(--chart-alert)' }}
              >
                {trend}
              </span>
            )}
            {trendLabel && (
              <span style={{ color: 'var(--muted)' }}>{trendLabel}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
