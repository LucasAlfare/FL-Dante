import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import SearchModal from './SearchModal';
import { ReadingProvider } from '../context/ReadingContext';
import { ThemeProvider } from '../context/ThemeContext';
import { SearchProvider } from '../context/SearchContext';

const RootContainer: React.FC = () => {
  return (
    <ReadingProvider>
      <ThemeProvider>
        <SearchProvider>
          <div className="w-screen h-screen overflow-hidden flex flex-col">
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
