import React from 'react';
import ReactMarkdown from 'react-markdown';
import { getBookFontStyle, bookFontFamily } from '../utils/fontStyles';
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
        className="max-w-4xl mx-auto text-gray-800"
        style={{
          ...getBookFontStyle('20px'),
        }}
      >
        <ReactMarkdown
          components={{
            h1: () => null,
            h2: () => null,
            h3: () => null,
            h4: () => null,
            h5: () => null,
            h6: () => null,
            p: ({ children }) => {
              const text = Array.isArray(children) ? children.join('') : children as string;
              const isFirstParagraph = text === state.content.split('\n\n')[0];

              if (isFirstParagraph && text.length > 0) {
                const firstLetter = text[0];
                const restOfText = text.slice(1);

                return (
                  <p
                    className="mb-4"
                    style={{
                      fontFamily: bookFontFamily,
                      fontSize: '20px',
                      lineHeight: '1.8',
                      textAlign: 'justify',
                      textIndent: '2rem'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '4rem',
                        float: 'left',
                        lineHeight: '1',
                        marginRight: '0.5rem',
                        marginTop: '-0.2rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {firstLetter}
                    </span>
                    {restOfText}
                  </p>
                );
              }

              return (
                <p
                  className="mb-4"
                  style={{
                    fontFamily: bookFontFamily,
                    fontSize: '20px',
                    lineHeight: '1.8',
                    textAlign: 'justify',
                    textIndent: '2rem'
                  }}
                >
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
