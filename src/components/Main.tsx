import React from 'react';
import LeftPanel from './LeftPanel';
import CenterPanel from './CenterPanel';
import RightPanel from './RightPanel';

/**
 * Main layout component that renders the three-panel interface.
 * 
 * This component creates the primary content area with:
 * - LeftPanel: Navigation and book selection
 * - CenterPanel: Main reading content
 * - RightPanel: Additional information and controls
 * 
 * Uses flexbox layout for responsive three-column design with proper overflow handling.
 * 
 * @component
 * @returns {JSX.Element} The main application layout
 */
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
