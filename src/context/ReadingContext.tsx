import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type BookType = 'inferno' | 'purgatory' | 'paradise';

interface ReadingState {
  currentBook: BookType;
  currentChapter: number;
  globalChapter: number;
  content: string;
  loading: boolean;
  error: string | null;
}

interface ReadingContextType {
  state: ReadingState;
  nextChapter: () => void;
  previousChapter: () => void;
  goToChapter: (book: BookType, chapter: number) => void;
  goToGlobalChapter: (globalChapter: number) => void;
}

const ReadingContext = createContext<ReadingContextType | undefined>(undefined);

const globalToBookChapter = (globalChapter: number): { book: BookType; chapter: number } => {
  if (globalChapter <= 34) return { book: 'inferno', chapter: globalChapter };
  if (globalChapter <= 67) return { book: 'purgatory', chapter: globalChapter - 34 };
  return { book: 'paradise', chapter: globalChapter - 67 };
};

const bookChapterToGlobal = (book: BookType, chapter: number): number => {
  if (book === 'inferno') return chapter;
  if (book === 'purgatory') return 34 + chapter; // Inferno has 34 chapters
  if (book === 'paradise') return 67 + chapter; // Inferno (34) + Purgatory (33) = 67
  return 1;
};


// Function to load chapter content
const loadChapterContent = async (book: BookType, chapter: number): Promise<string> => {
  const filePath = `/src/books/${book}/canto${chapter}.md`;
  const response = await fetch(filePath);
  
  if (!response.ok) {
    throw new Error(`Failed to load chapter: ${book} canto ${chapter}`);
  }

  const content = await response.text();
  return removeHeader(content);
};

const removeHeader = (content: string): string => {
  const headerEnd = content.indexOf('+++', content.indexOf('+++') + 1);
  return headerEnd !== -1 ? content.slice(headerEnd + 3).trim() : content;
};

export const ReadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ReadingState>({
    currentBook: 'inferno',
    currentChapter: 1,
    globalChapter: 1,
    content: '',
    loading: true,
    error: null,
  });

  const nextChapter = () => {
    setState(prevState => {
      const { book, chapter } = globalToBookChapter(prevState.globalChapter + 1);
      return {
        ...prevState,
        currentBook: book,
        currentChapter: chapter,
        globalChapter: prevState.globalChapter + 1,
      };
    });
  };

  const previousChapter = () => {
    setState(prevState => {
      if (prevState.globalChapter <= 1) return prevState;
      
      const { book, chapter } = globalToBookChapter(prevState.globalChapter - 1);
      return {
        ...prevState,
        currentBook: book,
        currentChapter: chapter,
        globalChapter: prevState.globalChapter - 1,
      };
    });
  };

  const goToChapter = (book: BookType, chapter: number) => {
    const globalChapter = bookChapterToGlobal(book, chapter);
    setState(prev => ({
      ...prev,
      currentBook: book,
      currentChapter: chapter,
      globalChapter,
    }));
  };

  const goToGlobalChapter = (globalChapter: number) => {
    const { book, chapter } = globalToBookChapter(globalChapter);
    setState(prev => ({
      ...prev,
      currentBook: book,
      currentChapter: chapter,
      globalChapter,
    }));
  };

  useEffect(() => {
    const loadContent = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      try {
        const chapterContent = await loadChapterContent(state.currentBook, state.currentChapter);
        setState(prev => ({
          ...prev,
          content: chapterContent,
          loading: false,
          error: null,
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          content: '',
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to load chapter',
        }));
      }
    };
    loadContent();
  }, [state.currentBook, state.currentChapter]);

  return (
    <ReadingContext.Provider
      value={{
        state,
        nextChapter,
        previousChapter,
        goToChapter,
        goToGlobalChapter,
      }}
    >
      {children}
    </ReadingContext.Provider>
  );
};

export const useReading = (): ReadingContextType => {
  const context = useContext(ReadingContext);
  if (!context) {
    throw new Error('useReading must be used within a ReadingProvider');
  }
  return context;
};

