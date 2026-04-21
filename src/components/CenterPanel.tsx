import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import ChapterProvider from '../services/ChapterProvider';
import { getBookFontStyle, bookFontFamily } from '../utils/fontStyles';

const CenterPanel: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadChapter = async () => {
      try {
        const chapterProvider = new ChapterProvider();
        // Hardcoded chapter 1 for testing (Inferno Canto 1)
        const chapterContent = await chapterProvider.getChapterByNumber(1);
        setContent(chapterContent);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load chapter');
      } finally {
        setLoading(false);
      }
    };

    loadChapter();
  }, []);

  if (loading) {
    return (
      <main className="flex-1 h-full bg-green-400 flex items-center justify-center">
        <span className="text-white font-medium text-lg">Carregando...</span>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 h-full bg-green-400 flex items-center justify-center">
        <span className="text-white font-medium text-lg">Erro: {error}</span>
      </main>
    );
  }

  return (
    <main className="flex-1 h-full bg-green-400 p-8" style={{overflow: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
      <div 
        className="max-w-4xl mx-auto text-white"
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
            p: ({children}) => {
              const text = Array.isArray(children) ? children.join('') : children as string;
              const isFirstParagraph = text === content.split('\n\n')[0];
              
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
          {content}
        </ReactMarkdown>
      </div>
    </main>
  );
};

export default CenterPanel;
