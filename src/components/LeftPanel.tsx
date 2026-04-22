import React, { useState, useEffect } from 'react';
import { useReading } from '../context/ReadingContext';
import type { BookType } from '../context/ReadingContext';

interface BookStructure {
  book: BookType;
  title: string;
  chapters: number;
}

const booksData: BookStructure[] = [
  { book: 'inferno', title: 'Inferno', chapters: 34 },
  { book: 'purgatory', title: 'Purgatório', chapters: 33 },
  { book: 'paradise', title: 'Paraíso', chapters: 33 },
];

const LeftPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedBooks, setExpandedBooks] = useState<Set<BookType>>(new Set());
  const { state, goToChapter } = useReading();

  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };

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

  const handleChapterClick = (book: BookType, chapter: number) => {
    goToChapter(book, chapter);
  };

  const isCurrentChapter = (book: BookType, chapter: number) => {
    return state.currentBook === book && state.currentChapter === chapter;
  };

  const isCurrentBook = (book: BookType) => {
    return state.currentBook === book;
  };

  useEffect(() => {
    // Auto-expand current book only when panel is first opened
    if (isExpanded && expandedBooks.size === 0) {
      setExpandedBooks(prev => new Set(prev).add(state.currentBook));
    }
  }, [isExpanded, state.currentBook]);

  return (
    <aside className={`h-full border-r border-gray-200 transition-all duration-300 ease-in-out ${isExpanded ? 'w-[300px]' : 'w-[40px]'} flex flex-col`}>
      <button
        onClick={togglePanel}
        className="p-2 hover:bg-gray-100 transition-colors duration-200 rounded-r-lg self-start"
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
      
      {isExpanded && (
        <nav className="flex-1 px-4 py-2 overflow-y-auto">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Sumário</h2>
          
          <div className="space-y-2">
            {booksData.map((bookData) => (
              <div key={bookData.book} className="border-l-2 border-gray-300 pl-2">
                <button
                  onClick={() => toggleBook(bookData.book)}
                  className={`w-full text-left flex items-center justify-between p-2 rounded hover:bg-gray-100 transition-colors ${
                    isCurrentBook(bookData.book) ? 'bg-gray-200 font-semibold' : ''
                  }`}
                >
                  <span className="text-sm font-medium text-gray-700">
                    {bookData.title}
                  </span>
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${
                      expandedBooks.has(bookData.book) ? 'rotate-90' : ''
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
                        className={`w-full text-left p-1 pl-4 rounded text-sm transition-colors ${
                          isCurrentChapter(bookData.book, chapter)
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                        }`}
                      >
                        Canto {chapter}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      )}
    </aside>
  );
};

export default LeftPanel;
