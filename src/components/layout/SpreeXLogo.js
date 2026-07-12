import React from 'react';

const SpreeXLogo = ({ className = 'logo-svg', size = 32 }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Left stroke: dynamic swoosh (using currentColor for theme adaptability) */}
    <path 
      d="M8 8L24 24" 
      stroke="currentColor" 
      strokeWidth="3.5" 
      strokeLinecap="round" 
    />
    {/* Right stroke: split/overlap crossing (using brand primary color) */}
    <path 
      d="M24 8L18 14" 
      stroke="var(--primary)" 
      strokeWidth="3.5" 
      strokeLinecap="round" 
    />
    <path 
      d="M14 18L8 24" 
      stroke="var(--primary)" 
      strokeWidth="3.5" 
      strokeLinecap="round" 
    />
  </svg>
);

export default SpreeXLogo;
