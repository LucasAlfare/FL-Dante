import React from 'react';
import { useReading } from '../context/ReadingContext';
import { BOOK_CHAPTERS } from '../utils/constants';

/**
 * Footer component with chapter navigation controls.
 * 
 * Features:
 * - Previous/Next chapter navigation buttons
 * - Current chapter progress indicator
 * - Responsive design with text/arrow-only buttons
 * - Disabled states at boundaries (first/last chapter)
 * 
 * @component
 * @returns {JSX.Element} Footer with navigation controls
 */
const Footer: React.FC = () => {
  const { previousChapter, nextChapter, state } = useReading();

  const totalChapters = BOOK_CHAPTERS[state.currentBook];
  const isFirstChapter = state.globalChapter === 1;
  const isLastChapter = state.globalChapter === 100;
  const currentChapter = state.currentChapter;

  return (
    <footer className="w-full h-14 flex items-center justify-evenly px-4 border-t">
      {/* Previous button - left side */}
      <button
        className="text-sm font-medium hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={previousChapter}
        disabled={isFirstChapter}
      >
        <span>←</span>
        <span className="hidden lg:inline">Previous</span>
      </button>

      {/* Progress indicator - centered */}
      <p>Canto {currentChapter} of {totalChapters}</p>

      {/* Next button - right side */}
      <button
        className="text-sm font-medium hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={nextChapter}
        disabled={isLastChapter}
      >
        <span className="hidden lg:inline">Next</span>
        <span>→</span>
      </button>
    </footer>
  );
};

export default Footer;
