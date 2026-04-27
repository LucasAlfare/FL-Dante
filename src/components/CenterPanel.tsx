import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { getBookFontStyleByScale, bookTypography } from '../utils/fontStyles';
import { useReading } from '../context/ReadingContext';

const CenterPanel: React.FC = () => {
  const { state } = useReading();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [state.currentBook, state.currentChapter]);

  if (state.loading) {
    return (
      <main className="flex-1 h-full flex items-center justify-center">
        <span className="font-medium text-lg">Carregando...</span>
      </main>
    );
  }

  if (state.error) {
    return (
      <main className="flex-1 h-full flex items-center justify-center">
        <span className="font-medium text-lg">Erro: {state.error}</span>
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
