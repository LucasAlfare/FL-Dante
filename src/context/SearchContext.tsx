import React, { createContext, useContext, useState, useEffect } from 'react';
import searchIndexData from '../data/search-index.json';
import { useReading } from './ReadingContext';

// Normalize text for search: remove accents and convert to lowercase
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Remove accents
};

interface SearchResult {
  id: string;
  book: string;
  chapter: number;
  title: string;
  summary: string;
  content: string;
  path: string;
}

interface SearchContextType {
  isSearchOpen: boolean;
  searchQuery: string;
  searchResults: SearchResult[];
  openSearch: () => void;
  closeSearch: () => void;
  setSearchQuery: (query: string) => void;
  performSearch: (query: string) => void;
  selectResult: (result: SearchResult) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

interface SearchProviderProps {
  children: React.ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchIndex, setSearchIndex] = useState<SearchResult[]>([]);
  const { goToChapter } = useReading();

  useEffect(() => {
    // Load search index on mount
    setSearchIndex(searchIndexData as SearchResult[]);
  }, []);

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const normalizedQuery = normalizeText(query.trim());
    const results = searchIndex.filter(item => {
      // Search in title, summary, and content with normalized text
      return (
        normalizeText(item.title).includes(normalizedQuery) ||
        normalizeText(item.summary).includes(normalizedQuery) ||
        normalizeText(item.content).includes(normalizedQuery)
      );
    });

    // Sort by relevance: title matches first, then summary, then content
    results.sort((a, b) => {
      const aTitleMatch = normalizeText(a.title).includes(normalizedQuery);
      const bTitleMatch = normalizeText(b.title).includes(normalizedQuery);
      
      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;
      
      const aSummaryMatch = normalizeText(a.summary).includes(normalizedQuery);
      const bSummaryMatch = normalizeText(b.summary).includes(normalizedQuery);
      
      if (aSummaryMatch && !bSummaryMatch) return -1;
      if (!aSummaryMatch && bSummaryMatch) return 1;
      
      return 0;
    });

    setSearchResults(results.slice(0, 10)); // Limit to 10 results
  };

  const openSearch = () => {
    setIsSearchOpen(true);
    setSearchQuery('');
    setSearchResults([]);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const selectResult = (result: SearchResult) => {
    // Navigate to the selected result
    goToChapter(result.book as 'inferno' | 'purgatory' | 'paradise', result.chapter);
    closeSearch();
  };

  return (
    <SearchContext.Provider
      value={{
        isSearchOpen,
        searchQuery,
        searchResults,
        openSearch,
        closeSearch,
        setSearchQuery,
        performSearch,
        selectResult
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
