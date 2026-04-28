import React, { useState, useEffect } from 'react';
import { useReading } from '../context/ReadingContext';
import { toRoman } from '../utils/romanNumerals';
import { getBookFontStyleByScale } from '../utils/fontStyles';

/**
 * Union type for the three books of Divine Comedy
 */
type BookType = 'inferno' | 'purgatory' | 'paradise';

/**
 * Interface defining book structure for navigation
 */
interface BookStructure {
  book: BookType;
  title: string;
  chapters: number;
}

/**
 * Static data for all books with their metadata
 */
const booksData: BookStructure[] = [
  { book: 'inferno', title: 'Inferno', chapters: 34 },
  { book: 'purgatory', title: 'Purgatório', chapters: 33 },
  { book: 'paradise', title: 'Paraíso', chapters: 33 },
];

/**
 * Left panel component with book navigation and chapter listing.
 * 
 * Features:
 * - Collapsible panel with smooth animations
 * - Book expansion/collapse functionality
 * - Chapter navigation with Roman numerals
 * - Current chapter/book highlighting
 * - Auto-expand current book when panel opens
 * 
 * @component
 * @returns {JSX.Element} Left navigation panel
 */
const LeftPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedBooks, setExpandedBooks] = useState<Set<BookType>>(new Set());
  const { state, goToChapter } = useReading();

  /**
   * Toggles panel expansion state
   */
  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };

  /**
   * Toggles book expansion in the navigation list
   * @param {BookType} book - The book to toggle
   */
  const toggleBook = (book: BookType) => {
    setExpandedBooks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(book)) {
        newSet.delete(book);
      } else {
        newSet.add(book);
      }
      return newSet;
    });
  };

  /**
   * Handles chapter click navigation
   * @param {BookType} book - The book containing the chapter
   * @param {number} chapter - The chapter number to navigate to
   */
  const handleChapterClick = (book: BookType, chapter: number) => {
    goToChapter(book, chapter);
  };

  /**
   * Checks if a chapter is currently active
   * @param {BookType} book - The book to check
   * @param {number} chapter - The chapter to check
   * @returns {boolean} Whether the chapter is current
   */
  const isCurrentChapter = (book: BookType, chapter: number) => {
    return state.currentBook === book && state.currentChapter === chapter;
  };

  /**
   * Checks if a book is currently active
   * @param {BookType} book - The book to check
   * @returns {boolean} Whether the book is current
   */
  const isCurrentBook = (book: BookType) => {
    return state.currentBook === book;
  };

  /**
   * Auto-expands current book when panel opens and no books are expanded
   */
  useEffect(() => {
    if (isExpanded && expandedBooks.size === 0) {
      setExpandedBooks(prev => new Set(prev).add(state.currentBook));
    }
  }, [isExpanded, state.currentBook]);

  return (
    <aside className={`h-full border-r transition-all duration-300 ease-in-out ${isExpanded ? 'w-[300px]' : 'w-[40px]'} flex flex-col`}>
      <button
        onClick={togglePanel}
        className="p-2 transition-colors duration-200 rounded-r-lg self-start"
        aria-label={isExpanded ? 'Collapse left panel' : 'Expand left panel'}
      >
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <nav className={`flex-1 px-4 py-2 overflow-y-auto transition-all duration-300 ease-in-out scrollbar-hide ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
        <h2 className="text-lg font-bold mb-4" style={getBookFontStyleByScale('lg')}>Sumário</h2>

        <div className="space-y-2">
          {booksData.map((bookData) => (
            <div key={bookData.book} className="border-l-2 pl-2">
              <button
                onClick={() => toggleBook(bookData.book)}
                className={`w-full text-left flex items-center justify-between p-2 rounded transition-colors ${isCurrentBook(bookData.book) ? 'font-semibold' : ''
                  }`}
              >
                <span className="text-sm font-medium" style={getBookFontStyleByScale('sm')}>
                  {bookData.title}
                </span>
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${expandedBooks.has(bookData.book) ? 'rotate-90' : ''
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {expandedBooks.has(bookData.book) && (
                <div className="ml-4 mt-1 space-y-1">
                  {Array.from({ length: bookData.chapters }, (_, i) => i + 1).map((chapter) => (
                    <button
                      key={chapter}
                      onClick={() => handleChapterClick(bookData.book, chapter)}
                      className={`w-full text-left p-1 pl-4 rounded text-sm transition-colors ${isCurrentChapter(bookData.book, chapter)
                          ? 'font-medium'
                          : 'hover:opacity-80'
                        }`}
                      style={getBookFontStyleByScale('sm')}
                    >
                      Canto {toRoman(chapter)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default LeftPanel;
