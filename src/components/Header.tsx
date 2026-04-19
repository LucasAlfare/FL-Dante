import { toRoman } from '../utils/romanNumerals';
import { bookFontClasses } from '../utils/fontStyles';
import TypographicOrnament from './TypographicOrnament';

interface HeaderProps {
  currentBook?: string;
  currentChapter?: number;
}

function Header({ currentBook = "Inferno", currentChapter = 1 }: HeaderProps) {
  return (
    <header className="py-4 px-8 border-b">
      <div className="flex items-center justify-between">
        {/* Título à esquerda */}
        <div className="flex-shrink-0">
          <div className="flex items-center gap-3">
            <TypographicOrnament direction="left" className="text-gray-600" />
            <h1 className={`text-2xl font-bold ${bookFontClasses.base}`}>Divina Comédia</h1>
            <TypographicOrnament direction="right" className="text-gray-600" />
          </div>
        </div>
        
        {/* Conteúdo dinâmico no centro */}
        <div className="flex-1 text-center">
          <div className="flex items-center justify-center gap-2">
            <TypographicOrnament direction="left" className="text-gray-500 w-6 h-3" />
            <h2 className={`text-lg font-medium ${bookFontClasses.base}`}>
              {currentBook} · Canto {toRoman(currentChapter)}
            </h2>
            <TypographicOrnament direction="right" className="text-gray-500 w-6 h-3" />
          </div>
        </div>
        
        {/* Ícones de interação à direita */}
        <div className="flex-shrink-0 flex items-center space-x-4">
          <button className="p-2 rounded-lg transition-colors" title="Pesquisar">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="p-2 rounded-lg transition-colors" title="Favoritos">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button className="p-2 rounded-lg transition-colors" title="Configurações">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
