import React, { useState } from 'react';

const LeftPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside className={`h-full border-r border-gray-200 transition-all duration-300 ease-in-out ${isExpanded ? 'w-[200px]' : 'w-[40px]'} flex items-center justify-start`}>
      <button
        onClick={togglePanel}
        className="p-2 hover:bg-gray-100 transition-colors duration-200 rounded-r-lg"
        aria-label={isExpanded ? 'Collapse left panel' : 'Expand left panel'}
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
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      {isExpanded && (
        <span className="font-medium ml-2">Left</span>
      )}
    </aside>
  );
};

export default LeftPanel;
