import React, { useEffect, useRef } from 'react';
import { useSearch } from '../context/SearchContext';
import { bookFontClasses } from '../utils/fontStyles';
import { toRoman } from '../utils/romanNumerals';
import XIcon from './icons/XIcon';

/**
 * Search modal component for searching across all Divine Comedy content.
 * 
 * Features:
 * - Full-screen modal overlay
 * - Real-time search with debounced input
 * - Search results with book and chapter information
 * - Keyboard navigation (Escape to close)
 * - Click outside to close functionality
 * - Auto-focus input when modal opens
 * - Empty state and no results messaging
 * 
 * @component
 * @returns {JSX.Element | null} Search modal or null when closed
 */
const SearchModal: React.FC = () => {
  const { isSearchOpen, searchQuery, searchResults, closeSearch, setSearchQuery, performSearch, selectResult } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  /**
   * Auto-focuses search input when modal opens
   */
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  /**
   * Handles keyboard and mouse events for modal closing
   */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSearch();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (modalRef.current && !modalRef.current.contains(target)) {
        closeSearch();
      }
    };

    if (isSearchOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen, closeSearch]);

  /**
   * Handles search input changes with real-time search
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    performSearch(query);
  };

  /**
   * Converts book key to display name
   * @param {string} book - Book key to convert
   * @returns {string} Display name for the book
   */
  const getBookName = (book: string): string => {
    switch (book) {
      case 'inferno': return 'Inferno';
      case 'purgatory': return 'Purgatório';
      case 'paradise': return 'Paraíso';
      default: return book;
    }
  };

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div ref={modalRef} className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Buscar nos cantos..."
              className={`flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${bookFontClasses.base}`}
            />
            <button
              onClick={closeSearch}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Fechar busca"
            >
              <XIcon />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[60vh]">
          {searchQuery && searchResults.length === 0 && (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <p className={bookFontClasses.base}>Nenhum resultado encontrado para "{searchQuery}"</p>
            </div>
          )}

          {!searchQuery && (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <p className={bookFontClasses.base}>Digite para buscar nos cantos da Divina Comédia</p>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="p-2">
              <p className={`px-2 py-1 text-sm text-gray-500 dark:text-gray-400 ${bookFontClasses.base}`}>
                {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''}
              </p>
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors"
                  onClick={() => selectResult(result)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-1">
                      <h3 className={`font-medium text-gray-900 dark:text-gray-100 ${bookFontClasses.base}`}>
                        {getBookName(result.book)} · Canto {toRoman(result.chapter)}
                      </h3>
                      <p className={`text-sm text-gray-600 dark:text-gray-400 mt-1 ${bookFontClasses.base}`}>
                        {result.summary}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
