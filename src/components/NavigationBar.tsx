import { useState } from 'react';
import { toRoman } from '../utils/romanNumerals';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentBook: string;
  currentChapter: number;
  onNavigate: (book: string, chapter: number) => void;
}

interface Book {
  id: string;
  title: string;
  chapters: number;
}

const books: Book[] = [
  { id: 'inferno', title: 'Inferno', chapters: 34 },
  { id: 'purgatory', title: 'Purgatório', chapters: 33 },
  { id: 'paradise', title: 'Paraíso', chapters: 33 }
];

function Sidebar({ isOpen, onToggle, currentBook, currentChapter, onNavigate }: SidebarProps) {
  const [expandedBooks, setExpandedBooks] = useState<Set<string>>(new Set([currentBook]));

  const toggleBook = (bookId: string) => {
    const newExpanded = new Set(expandedBooks);
    if (newExpanded.has(bookId)) {
      newExpanded.delete(bookId);
    } else {
      newExpanded.add(bookId);
    }
    setExpandedBooks(newExpanded);
  };

  const handleChapterClick = (book: string, chapter: number) => {
    onNavigate(book, chapter);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`fixed left-4 top-20 z-50 p-3 rounded-lg transition-all duration-300 ${
          isOpen ? 'translate-x-64' : 'translate-x-0'
        }`}
        title={isOpen ? 'Fechar sidebar' : 'Abrir sidebar'}
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 h-[calc(100vh-8rem)] transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="w-64 h-full overflow-y-auto">
          <div className="p-4">
            
            <div className="space-y-2">
              {books.map((book) => (
                // preciso que cada "livro" não tenha a "barra de scroll" aparecendo quando expandido!
                <div key={book.id}>
                  <button
                    onClick={() => toggleBook(book.id)}
                    className="w-full px-4 py-3 text-left flex items-center"
                  >
                    <svg 
                      className="w-4 h-4 mr-3 transition-all duration-200"
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      {/* nessa parte preciso que o icone seja uma bolinha e quando ativado que seja um diamante */}
                      {expandedBooks.has(book.id) ? (
                        // Diamond shape when expanded
                        <path d="M12 2L2 12L12 22L22 12L12 2Z" />
                      ) : (
                        // Circle shape when collapsed
                        <circle cx="12" cy="12" r="6" />
                      )}
                    </svg>
                    <span className="font-medium">{book.title}</span>
                  </button>
                  
                  {expandedBooks.has(book.id) && (
                    <div>
                      <div className="max-h-64 overflow-y-auto scrollbar-hide">
                        {Array.from({ length: book.chapters }, (_, i) => i + 1).map((chapter) => (
                          <button
                            key={chapter}
                            onClick={() => handleChapterClick(book.id, chapter)}
                            className={`w-full px-8 py-2 text-left text-sm ${
                              currentBook === book.id && currentChapter === chapter 
                                ? 'font-medium' 
                                : ''
                            }`}
                          >
                            Canto {toRoman(chapter)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
