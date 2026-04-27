import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useReading } from '../context/ReadingContext';
import LineSeparatorOrnamentIcon from './icons/LineSeparatorOrnamentIcon';
import { getBookFontStyleByScale } from '../utils/fontStyles';

const RightPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { state } = useReading();

  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside className={`h-full border-l transition-all duration-300 ease-in-out ${isExpanded ? 'w-[300px]' : 'w-[40px]'} flex flex-col`}>
      <button 
        onClick={togglePanel}
        className="p-2 transition-colors duration-200 rounded-l-lg self-end"
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
      
      <div className={`flex-1 px-4 py-2 overflow-y-auto transition-all duration-300 ease-in-out scrollbar-hide ${
        isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
          <div className="space-y-4">
            {/* Seção Resumo do Canto */}
            {state.summary && (
              <section>
                <h3 className="text-sm font-bold mb-2 uppercase tracking-wide" style={getBookFontStyleByScale('sm')}>
                  Resumo do Canto
                </h3>
                {/* <div className="border-b mb-3"></div> */}
                <div className="text-sm leading-relaxed" style={getBookFontStyleByScale('sm')}>
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => (
                        <p className="mb-2">{children}</p>
                      ),
                      strong: ({ children }) => (
                        <span className="font-semibold">{children}</span>
                      ),
                      em: ({ children }) => (
                        <span className="italic">{children}</span>
                      )
                    }}
                  >
                    {state.summary}
                  </ReactMarkdown>
                </div>
              </section>
            )}

            {/* Separador ornamental */}
            {state.summary && state.notes && (
              <div className="flex justify-center h-20 w-60">
                <LineSeparatorOrnamentIcon />
              </div>
            )}

            {/* Seção Notas */}
            {state.notes && (
              <section>
                <h3 className="text-sm font-bold mb-2 uppercase tracking-wide" style={getBookFontStyleByScale('sm')}>
                  Notas
                </h3>
                {/* <div className="border-b mb-3"></div> */}
                <div className="text-sm leading-relaxed" style={getBookFontStyleByScale('sm')}>
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => (
                        <p className="mb-2">{children}</p>
                      ),
                      strong: ({ children }) => (
                        <span className="font-semibold">{children}</span>
                      ),
                      em: ({ children }) => (
                        <span className="italic">{children}</span>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside mb-2">{children}</ul>
                      ),
                      li: ({ children }) => (
                        <li className="mb-1">{children}</li>
                      )
                    }}
                  >
                    {state.notes}
                  </ReactMarkdown>
                </div>
              </section>
            )}
          </div>
        </div>
    </aside>
  );
};

export default RightPanel;
