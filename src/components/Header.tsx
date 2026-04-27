import React, { useState, useEffect, useRef } from 'react';
import { bookFontClasses } from '../utils/fontStyles';
import { toRoman } from '../utils/romanNumerals';
import DanteIcon from './icons/DanteIcon';
import MailIcon from './icons/MailIcon';
import MenuIcon from './icons/MenuIcon';
import SearchIcon from './icons/SearchIcon';
import ThemeIcon from './icons/ThemeIcon';
import ContactsPanel from './ContactsPanel';
import { useReading } from '../context/ReadingContext';
import { useTheme } from '../context/ThemeContext';
import { useSearch } from '../context/SearchContext';
import { getBookName } from '../utils/constants';
import LeftIndicatorIcon from './icons/LeftIndicatorIcon';

const CenterIndicator: React.FC<{ currentBook: 'inferno' | 'purgatory' | 'paradise'; currentChapter: number }> = ({ currentBook, currentChapter }) => {
  const currentChapterRoman = toRoman(currentChapter);

  return (
    <div className="flex justify-between items-center">
      <div className="-translate-x-5 -translate-y-1 scale-3 w-3 h-3">
        <LeftIndicatorIcon />
      </div>

      <span className={bookFontClasses.base}>
        {getBookName(currentBook)} · Canto {currentChapterRoman}
      </span>

      <div className="translate-x-5 -translate-y-1 -scale-x-3 scale-y-3 w-3 h-3">
        <LeftIndicatorIcon />
      </div>
    </div>
  );
};

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactsPanelOpen, setIsContactsPanelOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { state } = useReading();
  const { currentBook, currentChapter } = state;
  const { state: themeState, toggleVariant } = useTheme();
  const { variant } = themeState;
  const { openSearch } = useSearch();

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleContactsPanel = (): void => {
    setIsContactsPanelOpen(!isContactsPanelOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as Node;
      const menuButton = document.querySelector('[aria-label="Menu"]');

      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        menuButton &&
        !menuButton.contains(target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="w-full h-16 border-b flex items-center justify-between px-4 relative">
        {/* Left side: DanteIcon and title */}
        <div className="flex flex-col items-center scale-90 py-1">
          <div className="scale-75">
            <DanteIcon />
          </div>
          <span className={`${bookFontClasses.base} text-xs font-light italic text-center leading-tight mt-1`}>
            A Divina<br />Comédia
          </span>
        </div>

        {/* Center: Current canto indicator */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          {/* quero uma fonte maior e mais forte aqui, sem ser negrito tosco*/}
          <CenterIndicator currentBook={currentBook} currentChapter={currentChapter} />
        </div>

        {/* Right side: Control buttons - only visible on large screens */}
        <div className="hidden lg:flex items-center space-x-2">
          <button
            className="p-2 rounded-lg transition-colors"
            aria-label={variant === 'light' ? 'Alternar para tema escuro' : 'Alternar para tema claro'}
            onClick={toggleVariant}
          >
            <ThemeIcon />
          </button>
          <button className="p-2 rounded-lg transition-colors" aria-label="Pesquisar" onClick={openSearch}>
            <SearchIcon />
          </button>
          <button
            className="p-2 rounded-lg transition-colors"
            aria-label="Contatos"
            onClick={toggleContactsPanel}
          >
            <MailIcon />
          </button>
        </div>

        {/* Menu button - only visible on small screens */}
        <button
          className="lg:hidden p-2 rounded-lg transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          <MenuIcon />
        </button>
      </header>

      {/* Mobile menu dropdown */}
      <div
        ref={menuRef}
        className={`lg:hidden absolute top-16 left-0 right-0 border-b shadow-lg z-50 transition-all duration-300 ease-in-out ${isMobileMenuOpen
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
      >
        <div className="py-2">
          <button
            className="w-full px-4 py-3 flex items-center space-x-3 transition-colors"
            onClick={toggleVariant}
          >
            <ThemeIcon />
            <span className={bookFontClasses.base}>
              {variant === 'light' ? 'Tema Escuro' : 'Tema Claro'}
            </span>
          </button>
          <button className="w-full px-4 py-3 flex items-center space-x-3 transition-colors" onClick={openSearch}>
            <SearchIcon />
            <span className={bookFontClasses.base}>Pesquisar</span>
          </button>
          <button
            className="w-full px-4 py-3 flex items-center space-x-3 transition-colors"
            onClick={toggleContactsPanel}
          >
            <MailIcon />
            <span className={bookFontClasses.base}>Contatos</span>
          </button>
        </div>
      </div>

      <ContactsPanel isOpen={isContactsPanelOpen} onClose={() => setIsContactsPanelOpen(false)} />
    </>
  );
};

export default Header;
