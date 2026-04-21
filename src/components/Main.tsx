import React from 'react';
import LeftPanel from './LeftPanel';
import CenterPanel from './CenterPanel';
import RightPanel from './RightPanel';

const Main: React.FC = () => {
  return (
    <main className="w-full flex-1 flex flex-row overflow-hidden">
      <LeftPanel />
      <CenterPanel />
      <RightPanel />
    </main>
  );
};

export default Main;
