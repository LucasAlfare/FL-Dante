import React from 'react';

const LeftPanel: React.FC = () => {
  return (
    <aside className="w-[100px] h-full bg-red-400 flex items-center justify-start pl-4">
      <span className="text-white font-medium">Left</span>
    </aside>
  );
};

export default LeftPanel;
