import React from 'react';
import ReactMarkdown from 'react-markdown';
import { getBookFontStyle } from '../utils/fontStyles';
import { useReading } from '../context/ReadingContext';

const CenterPanel: React.FC = () => {
  const { state } = useReading();

  if (state.loading) {
    return (
      <main className="flex-1 h-full flex items-center justify-center">
        <span className="text-gray-600 font-medium text-lg">Carregando...</span>
      </main>
    );
  }

  if (state.error) {
    return (
      <main className="flex-1 h-full flex items-center justify-center">
        <span className="text-red-600 font-medium text-lg">Erro: {state.error}</span>
      </main>
    );
  }

  return (
    <main className="flex-1 h-full p-8" style={{ overflow: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <div
        className="max-w-4xl mx-auto text-gray-800 drop-cap-first-letter-custom"
        style={{
          ...getBookFontStyle('20px'),
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
