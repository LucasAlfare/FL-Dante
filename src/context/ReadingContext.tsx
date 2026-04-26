import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import booksData from '../data/books.json';

type BookType = 'inferno' | 'purgatory' | 'paradise';

// Helper functions
const globalToBookChapter = (globalChapter: number): { book: BookType; chapter: number } => {
  if (globalChapter <= 34) return { book: 'inferno', chapter: globalChapter };
  if (globalChapter <= 67) return { book: 'purgatory', chapter: globalChapter - 34 };
  return { book: 'paradise', chapter: globalChapter - 67 };
};

const bookChapterToGlobal = (book: BookType, chapter: number): number => {
  if (book === 'inferno') return chapter;
  if (book === 'purgatory') return 34 + chapter;
  if (book === 'paradise') return 67 + chapter;
  return 1;
};

interface ReadingState {
  currentBook: BookType;
  currentChapter: number;
  globalChapter: number;
  content: string;
  summary: string;
  notes: string;
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

export const ReadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ReadingState>({
    currentBook: 'inferno',
    currentChapter: 1,
    globalChapter: 1,
    content: '',
    summary: '',
    notes: '',
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
    const loadContent = () => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      try {
        const bookData = booksData.find(book => book.slug === state.currentBook);
        if (!bookData) {
          throw new Error(`Book not found: ${state.currentBook}`);
        }
        
        const chapterData = bookData.chapters[state.currentChapter - 1];
        if (!chapterData) {
          throw new Error(`Chapter not found: ${state.currentBook} canto ${state.currentChapter}`);
        }
        
        setState(prev => ({
          ...prev,
          summary: chapterData.summary,
          notes: chapterData.notes.join('\n\n'),
          content: chapterData.body,
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

