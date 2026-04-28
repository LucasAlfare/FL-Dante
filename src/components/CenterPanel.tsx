import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { getBookFontStyleByScale, bookTypography } from '../utils/fontStyles';
import { useReading } from '../context/ReadingContext';

/**
 * Center panel component displaying main reading content.
 * 
 * Features:
 * - Markdown rendering with custom styling
 * - Auto-scroll to top on chapter change
 * - Loading and error states
 * - Custom paragraph styling with drop caps
 * - Custom scrollbar styling
 * 
 * @component
 * @returns {JSX.Element} Main content area
 */
const CenterPanel: React.FC = () => {
  const { state } = useReading();
  const mainRef = useRef<HTMLElement>(null);

  /**
   * Scrolls to top when chapter changes
   */
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [state.currentBook, state.currentChapter]);

  if (state.loading) {
    return (
      <main className="flex-1 h-full flex items-center justify-center">
        <span className="font-medium text-lg">Loading...</span>
      </main>
    );
  }

  if (state.error) {
    return (
      <main className="flex-1 h-full flex items-center justify-center">
        <span className="font-medium text-lg">Error: {state.error}</span>
      </main>
    );
  }

  return (
    <main ref={mainRef} className="flex-1 h-full p-8" style={{ overflow: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <div
        className="max-w-4xl mx-auto drop-cap-first-letter-custom"
        style={{
          ...getBookFontStyleByScale('lg'),
          textIndent: bookTypography.paragraphIndent,
        }}
      >
        <ReactMarkdown
          components={{
            p: ({ children }) => {
              return (
                <p className="mb-4">
                  {children}
                </p>
              );
            }
          }}
        >
          {state.content}
        </ReactMarkdown>
      </div>
    </main>
  );
};

export default CenterPanel;
