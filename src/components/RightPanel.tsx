import React, { useState } from 'react';

const RightPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside className={`h-full border-l border-gray-200 transition-all duration-300 ease-in-out ${isExpanded ? 'w-[300px]' : 'w-[40px]'} flex flex-col`}>
      <button 
        onClick={togglePanel}
        className="p-2 hover:bg-gray-100 transition-colors duration-200 rounded-l-lg self-end"
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
      
      {isExpanded && (
        <div className="flex-1 px-4 py-2 overflow-y-auto">
          <div className="space-y-4">
            {/* Seção Resumo do Canto */}
            <section>
              <h3 className="text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">
                Resumo do Canto
              </h3>
              <div className="border-b border-gray-300 mb-3"></div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </section>

            {/* Seção Notas */}
            <section>
              <h3 className="text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">
                Notas
              </h3>
              <div className="border-b border-gray-300 mb-3"></div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </section>
          </div>
        </div>
      )}
    </aside>
  );
};

export default RightPanel;
