import React from 'react';
import DanteIcon from './icons/DanteIcon';
import SettingsIcon from './icons/SettingsIcon';
import SearchIcon from './icons/SearchIcon';
import MailIcon from './icons/MailIcon';
  
const Header: React.FC = () => {
  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      {/* Left side: DanteIcon and title */}
      <div className="flex items-center space-x-3">
        <DanteIcon />
        <span className="text-lg font-semibold text-gray-900">A Divina Comédia</span>
      </div>

      {/* Center: Current canto indicator */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <span className="text-gray-700 font-medium">Purgatório · Canto 11</span>
      </div>

      {/* Right side: Control buttons */}
      <div className="flex items-center space-x-2">
        <div className="p-2">
          <SettingsIcon />
        </div>
        <div className="p-2">
          <SearchIcon />
        </div>
        <div className="p-2">
          <MailIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
