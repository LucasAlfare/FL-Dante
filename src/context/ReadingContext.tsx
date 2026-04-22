import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type BookType = 'inferno' | 'purgatory' | 'paradise';

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


// Function to parse markdown content and extract summary, notes, and main content
const parseMarkdownContent = (content: string): { summary: string; notes: string; content: string } => {
  // Remove TOML header
  const headerEnd = content.indexOf('+++', content.indexOf('+++') + 1);
  const afterHeader = headerEnd !== -1 ? content.slice(headerEnd + 3).trim() : content;
  
  // Split by the separator ---
  const separatorIndex = afterHeader.indexOf('\n---\n');
  
  if (separatorIndex === -1) {
    // No separator, treat everything as content
    return {
      summary: '',
      notes: '',
      content: afterHeader
    };
  }
  
  const beforeSeparator = afterHeader.substring(0, separatorIndex);
  const afterSeparator = afterHeader.substring(separatorIndex + 5); // +5 to skip \n---\n
  
  // Extract summary (first > block before separator)
  const summaryMatch = beforeSeparator.match(/^>\s*(.+)$/m);
  const summary = summaryMatch ? summaryMatch[1].trim() : '';
  
  // Extract notes (all > blocks after separator)
  const notesLines = afterSeparator.split('\n').filter(line => line.trim().startsWith('>'));
  const notes = notesLines.map(line => line.trim().substring(1).trim()).join('\n');
  
  // Extract main content (lines that don't start with >)
  const contentLines = afterSeparator.split('\n').filter(line => !line.trim().startsWith('>'));
  const mainContent = contentLines.join('\n').trim();
  
  return {
    summary,
    notes,
    content: mainContent
  };
};

// Function to load chapter content
const loadChapterContent = async (book: BookType, chapter: number): Promise<{ summary: string; notes: string; content: string }> => {
  const filePath = `/src/books/${book}/canto${chapter}.md`;
  const response = await fetch(filePath);
  
  if (!response.ok) {
    throw new Error(`Failed to load chapter: ${book} canto ${chapter}`);
  }

  const rawContent = await response.text();
  return parseMarkdownContent(rawContent);
};

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
    const loadContent = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      try {
        const { summary, notes, content } = await loadChapterContent(state.currentBook, state.currentChapter);
        setState(prev => ({
          ...prev,
          summary,
          notes,
          content,
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

