import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type BookType = 'inferno' | 'purgatory' | 'paradise';

interface ReadingState {
  currentBook: BookType;
  currentChapter: number;
  globalChapter: number;
}

interface ContentState {
  content: string;
  loading: boolean;
  error: string | null;
}

interface ReadingContextType {
  state: ReadingState;
  content: ContentState;
  nextChapter: () => void;
  previousChapter: () => void;
  goToChapter: (book: BookType, chapter: number) => void;
  goToGlobalChapter: (globalChapter: number) => void;
  refreshContent: () => void;
}

const ReadingContext = createContext<ReadingContextType | undefined>(undefined);

const globalToBookChapter = (globalChapter: number): { book: BookType; chapter: number } => {
  if (globalChapter < 1 || globalChapter > 100) {
    throw new Error('Invalid chapter number. Must be between 1 and 100.');
  }
  
  if (globalChapter <= 34) {
    return { book: 'inferno', chapter: globalChapter };
  } else if (globalChapter <= 67) {
    return { book: 'purgatory', chapter: globalChapter - 34 };
  } else {
    return { book: 'paradise', chapter: globalChapter - 67 };
  }
};

const bookChapterToGlobal = (book: BookType, chapter: number): number => {
  if (book === 'inferno') return chapter;
  if (book === 'purgatory') return 34 + chapter; // Inferno has 34 chapters
  if (book === 'paradise') return 67 + chapter; // Inferno (34) + Purgatory (33) = 67
  return 1;
};

const getTotalChaptersInBook = (book: BookType): number => {
  switch (book) {
    case 'inferno': return 34;
    case 'purgatory': return 33;
    case 'paradise': return 33;
    default: return 34;
  }
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

// Function to remove markdown header
const removeHeader = (content: string): string => {
  const lines = content.split('\n');
  let startIndex = 0;
  let endIndex = lines.length;

  // Find the opening +++
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '+++') {
      startIndex = i + 1;
      break;
    }
  }

  // Find the closing +++
  for (let i = startIndex; i < lines.length; i++) {
    if (lines[i].trim() === '+++') {
      endIndex = i + 1;
      break;
    }
  }

  // Return content after the header
  return lines.slice(endIndex).join('\n').trim();
};

export const ReadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ReadingState>({
    currentBook: 'inferno',
    currentChapter: 1,
    globalChapter: 1,
  });

  const [content, setContent] = useState<ContentState>({
    content: '',
    loading: true,
    error: null,
  });

  const nextChapter = () => {
    setState(prevState => {
      const { book, chapter } = globalToBookChapter(prevState.globalChapter + 1);
      return {
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
        currentBook: book,
        currentChapter: chapter,
        globalChapter: prevState.globalChapter - 1,
      };
    });
  };

  const goToChapter = (book: BookType, chapter: number) => {
    const globalChapter = bookChapterToGlobal(book, chapter);
    setState({
      currentBook: book,
      currentChapter: chapter,
      globalChapter,
    });
  };

  const goToGlobalChapter = (globalChapter: number) => {
    const { book, chapter } = globalToBookChapter(globalChapter);
    setState({
      currentBook: book,
      currentChapter: chapter,
      globalChapter,
    });
  };

  const refreshContent = async () => {
    setContent(prev => ({ ...prev, loading: true, error: null }));
    try {
      const chapterContent = await loadChapterContent(state.currentBook, state.currentChapter);
      setContent({
        content: chapterContent,
        loading: false,
        error: null,
      });
    } catch (error) {
      setContent({
        content: '',
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load chapter',
      });
    }
  };

  // Load content whenever chapter changes
  useEffect(() => {
    refreshContent();
  }, [state.currentBook, state.currentChapter]);

  return (
    <ReadingContext.Provider
      value={{
        state,
        content,
        nextChapter,
        previousChapter,
        goToChapter,
        goToGlobalChapter,
        refreshContent,
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

// Helper hook for getting book-specific info
export const useBookInfo = () => {
  const { state } = useReading();
  const totalChapters = getTotalChaptersInBook(state.currentBook);
  const totalGlobalChapters = 34 + 33 + 33; // Inferno + Purgatory + Paradise
  
  return {
    currentBook: state.currentBook,
    currentChapter: state.currentChapter,
    totalChapters,
    isFirstChapter: state.globalChapter === 1,
    isLastChapter: state.globalChapter === totalGlobalChapters,
    isFirstInBook: state.currentChapter === 1,
    isLastInBook: state.currentChapter === totalChapters,
  };
};
