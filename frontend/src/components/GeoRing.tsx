import React from 'react';

export default function GeoRing({ score }: { score: number | string }) {
  const numericScore = typeof score === 'string' ? parseFloat(score) : score;
  const isGood = numericScore >= 70;
  const isWarning = numericScore >= 50 && numericScore < 70;

  return (
    <div className="relative flex items-center justify-center w-32 h-32 mx-auto">
      {/* Outer SVG Rings */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle 
          cx="50" cy="50" r="45" 
          fill="none" stroke="currentColor" strokeWidth="6" 
          className="text-sage-100 dark:text-ash-800"
        />
        {/* Environmental arc */}
        <circle 
          cx="50" cy="50" r="45" 
          fill="none" stroke="currentColor" strokeWidth="6" 
          strokeDasharray="283" strokeDashoffset={283 - (283 * 0.85)} 
          className="text-forest-500 drop-shadow-md animate-[spin-slow_12s_linear_infinite]"
          strokeLinecap="round"
        />
        {/* Social arc - slightly smaller radius */}
        <circle 
          cx="50" cy="50" r="35" 
          fill="none" stroke="currentColor" strokeWidth="5" 
          strokeDasharray="220" strokeDashoffset={220 - (220 * 0.64)} 
          className="text-bio-500 drop-shadow-md animate-[spin-slow_8s_linear_infinite_reverse]"
          strokeLinecap="round"
        />
        {/* Governance arc */}
        <circle 
          cx="50" cy="50" r="25" 
          fill="none" stroke="currentColor" strokeWidth="4" 
          strokeDasharray="157" strokeDashoffset={157 - (157 * 0.90)} 
          className="text-amber-500 drop-shadow-md animate-[spin-slow_10s_linear_infinite]"
          strokeLinecap="round"
        />
      </svg>
      
      {/* Central Score */}
      <div className="relative z-10 flex flex-col items-center justify-center bg-white dark:bg-ash-900 rounded-full w-20 h-20 shadow-inner">
        <span className="font-display font-bold text-3xl text-forest-900 dark:text-ivory tracking-tighter">
          {score}
        </span>
      </div>
    </div>
  );
}
