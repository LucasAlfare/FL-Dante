import React from 'react';
import { useReading } from '../context/ReadingContext';
import { BOOK_CHAPTERS } from '../utils/constants';

const Footer: React.FC = () => {
  const { previousChapter, nextChapter, state } = useReading();
  
  const totalChapters = BOOK_CHAPTERS[state.currentBook];
  const isFirstChapter = state.globalChapter === 1;
  const isLastChapter = state.globalChapter === 100;
  const currentChapter = state.currentChapter;

  return (
    <footer className="w-full h-14 flex items-center justify-evenly px-4 border-t">
      {/* Botão Anterior - extremidade esquerda */}
      <button 
        className="text-sm font-medium hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={previousChapter}
        disabled={isFirstChapter}
      >
        <span>←</span>
        <span className="hidden lg:inline">Anterior</span>
      </button>

      {/* Indicador de progresso - centralizado */}
      <p>Canto {currentChapter} de {totalChapters}</p>

      {/* Botão Próximo - extremidade direita */}
      <button 
        className="text-sm font-medium hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={nextChapter}
        disabled={isLastChapter}
      >
        <span className="hidden lg:inline">Próximo</span>
        <span>→</span>
      </button>
    </footer>
  );
};

export default Footer;
