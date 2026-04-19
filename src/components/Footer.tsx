import { bookFontClasses } from '../utils/fontStyles';

interface FooterProps {
  currentBook: string;
  currentChapter: number;
  totalChapters: number;
  onPrevious: () => void;
  onNext: () => void;
}

const Footer = ({ currentBook, currentChapter, totalChapters, onPrevious, onNext }: FooterProps) => {
  const getBookTotalChapters = (book: string): number => {
    const chapterCounts: { [key: string]: number } = {
      'inferno': 34,
      'purgatory': 33,
      'paradise': 34
    };
    return chapterCounts[book] || 34;
  };
  return (
    <footer className="border-t border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Previous button */}
        <button 
          onClick={onPrevious}
          className={`flex items-center gap-2 px-4 py-2 ${bookFontClasses.base} ${bookFontClasses.sizes.sm} disabled:opacity-50`}
          disabled={totalChapters <= 1}
        >
          <span className="text-xs">←</span>
          <span>Canto anterior</span>
        </button>

        {/* Chapter indicator */}
        <div className="flex items-center gap-3">
          <span className="text-xs">‹</span>
          <span className={`${bookFontClasses.base} ${bookFontClasses.sizes.sm}`}>
            Canto {currentChapter} de {getBookTotalChapters(currentBook)}
          </span>
          <span className="text-xs">›</span>
        </div>

        {/* Next button */}
        <button 
          onClick={onNext}
          className={`flex items-center gap-2 px-4 py-2 ${bookFontClasses.base} ${bookFontClasses.sizes.sm} disabled:opacity-50`}
          disabled={totalChapters >= 100}
        >
          <span>Próximo canto</span>
          <span className="text-xs">→</span>
        </button>
      </div>
    </footer>
  )
}

export default Footer
