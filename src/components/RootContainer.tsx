import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { ReadingProvider } from '../context/ReadingContext';
import { ThemeProvider } from '../context/ThemeContext';

const RootContainer: React.FC = () => {
  return (
    <ReadingProvider>
      <ThemeProvider>
        <div className="w-screen h-screen overflow-hidden flex flex-col">
          <Header />
          <Main />
          <Footer />
        </div>
      </ThemeProvider>
    </ReadingProvider>
  );
};

export default RootContainer;
