import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const RootContainer: React.FC = () => {
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default RootContainer;
