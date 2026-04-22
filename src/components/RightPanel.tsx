import React, { useState } from 'react';

const RightPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside className={`h-full border-l border-gray-200 transition-all duration-300 ease-in-out ${isExpanded ? 'w-[200px]' : 'w-[40px]'} flex items-center justify-end`}>
      {isExpanded && (
        <span className="font-medium mr-2">Right</span>
      )}
      <button 
        onClick={togglePanel}
        className="p-2 hover:bg-gray-100 transition-colors duration-200 rounded-l-lg"
        aria-label={isExpanded ? 'Collapse right panel' : 'Expand right panel'}
      >
        <svg 
          className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 19l-7-7 7-7" 
          />
        </svg>
      </button>
    </aside>
  );
};

export default RightPanel;
