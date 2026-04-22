import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { ReadingProvider } from '../context/ReadingContext';

const RootContainer: React.FC = () => {
  return (
    <ReadingProvider>
      <div className="w-screen h-screen overflow-hidden flex flex-col">
        <Header />
        <Main />
        <Footer />
      </div>
    </ReadingProvider>
  );
};

export default RootContainer;
