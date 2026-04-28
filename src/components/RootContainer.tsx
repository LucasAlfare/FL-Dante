import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import SearchModal from './SearchModal';
import { ReadingProvider } from '../context/ReadingContext';
import { ThemeProvider } from '../context/ThemeContext';
import { SearchProvider } from '../context/SearchContext';

/**
 * Root layout component that wraps the entire application with context providers.
 * 
 * This component establishes the overall application structure and provides
 * all necessary context providers for state management:
 * - ReadingProvider: Manages current book, chapter, and content state
 * - ThemeProvider: Handles theme switching and styling
 * - SearchProvider: Manages search functionality and results
 * 
 * The layout uses a full-screen flex container with proper overflow handling
 * and responsive design principles.
 * 
 * @component
 * @returns {JSX.Element} The root application layout with all providers
 */
const RootContainer: React.FC = () => {
  return (
    <ReadingProvider>
      <ThemeProvider>
        <SearchProvider>
          <div className="w-screen h-[100dvh] overflow-hidden flex flex-col">
            <Header />
            <Main />
            <Footer />
            <SearchModal />
          </div>
        </SearchProvider>
      </ThemeProvider>
    </ReadingProvider>
  );
};

export default RootContainer;
