import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import booksData from '../data/books.json';
import { BOOK_CHAPTERS, getBookName } from '../utils/constants';

/**
 * Union type for the three books of Divine Comedy
 */
type BookType = 'inferno' | 'purgatory' | 'paradise';

/**
 * Converts global chapter number to book-specific chapter and book type.
 * Used for navigation across the entire Divine Comedy work.
 * 
 * @param {number} globalChapter - Global chapter number (1-100)
 * @returns {{book: BookType, chapter: number}} Book type and chapter number
 */
const globalToBookChapter = (globalChapter: number): { book: BookType; chapter: number } => {
  if (globalChapter <= BOOK_CHAPTERS.inferno) return { book: 'inferno', chapter: globalChapter };
  if (globalChapter <= BOOK_CHAPTERS.inferno + BOOK_CHAPTERS.purgatory) return { book: 'purgatory', chapter: globalChapter - BOOK_CHAPTERS.inferno };
  return { book: 'paradise', chapter: globalChapter - BOOK_CHAPTERS.inferno - BOOK_CHAPTERS.purgatory };
};

/**
 * Converts book-specific chapter to global chapter number.
 * Used for calculating global position in the entire work.
 * 
 * @param {BookType} book - The book type
 * @param {number} chapter - Chapter number within the book
 * @returns {number} Global chapter number
 */
const bookChapterToGlobal = (book: BookType, chapter: number): number => {
  if (book === 'inferno') return chapter;
  if (book === 'purgatory') return BOOK_CHAPTERS.inferno + chapter;
  if (book === 'paradise') return BOOK_CHAPTERS.inferno + BOOK_CHAPTERS.purgatory + chapter;
  return 1;
};

/**
 * Interface defining the reading state for the current chapter
 */
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

/**
 * Interface defining the reading context methods and state
 */
interface ReadingContextType {
  state: ReadingState;
  nextChapter: () => void;
  previousChapter: () => void;
  goToChapter: (book: BookType, chapter: number) => void;
  goToGlobalChapter: (globalChapter: number) => void;
}

/**
 * React context for managing reading state and navigation.
 * Handles book/chapter navigation and content loading.
 */
const ReadingContext = createContext<ReadingContextType | undefined>(undefined);

/**
 * Reading provider component that manages chapter navigation and content loading.
 * 
 * This provider handles:
 * - Current book and chapter state
 * - Content loading from books.json
 * - Navigation between chapters (next/previous)
 * - Direct chapter navigation by book or global position
 * 
 * @param {ReactNode} children - Child components to wrap with reading context
 * @component
 */
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

  /**
   * Navigates to the next chapter in the sequence.
   * Automatically handles book transitions when reaching end of current book.
   */
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

  /**
   * Navigates to the previous chapter in the sequence.
   * Prevents navigation before chapter 1.
   * Automatically handles book transitions when reaching start of current book.
   */
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

  /**
   * Navigates to a specific chapter within a specific book.
   * 
   * @param {BookType} book - The book to navigate to
   * @param {number} chapter - The chapter number within the book
   */
  const goToChapter = (book: BookType, chapter: number) => {
    const globalChapter = bookChapterToGlobal(book, chapter);
    setState(prev => ({
      ...prev,
      currentBook: book,
      currentChapter: chapter,
      globalChapter,
    }));
  };

  /**
   * Navigates to a specific global chapter position.
   * Automatically determines the correct book and chapter.
   * 
   * @param {number} globalChapter - Global chapter number (1-100)
   */
  const goToGlobalChapter = (globalChapter: number) => {
    const { book, chapter } = globalToBookChapter(globalChapter);
    setState(prev => ({
      ...prev,
      currentBook: book,
      currentChapter: chapter,
      globalChapter,
    }));
  };

  /**
   * Loads chapter content whenever book or chapter changes.
   * Fetches data from books.json and updates state with content, summary, and notes.
   */
  useEffect(() => {
    const loadContent = () => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      try {
        // Find book by matching the exact name from JSON
        const expectedBookName = getBookName(state.currentBook);
        const bookData = booksData.find(book => book.name === expectedBookName);

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

/**
 * Custom hook for accessing reading context.
 * Provides access to reading state and navigation functions.
 * 
 * @returns {ReadingContextType} Reading context value
 * @throws {Error} If used outside of ReadingProvider
 */
export const useReading = (): ReadingContextType => {
  const context = useContext(ReadingContext);
  if (!context) {
    throw new Error('useReading must be used within a ReadingProvider');
  }
  return context;
};

