import React from 'react';

const Footer: React.FC = () => {
  // Hardcoded values para demonstração do layout
  const currentChapter = 4;
  const totalChaptersInBook = 34;

  return (
    <footer className="w-full h-14 flex items-center justify-evenly px-4 border-t">
      {/* Botão Anterior - extremidade esquerda, só deve aparecer e */}
      <button className="text-sm font-medium hover:opacity-70 transition-opacity">
        <span>←</span>
        <span className="hidden lg:inline">Anterior</span>
      </button>

      {/* Indicador de progresso - centralizado */}
      <p>Canto {currentChapter} de {totalChaptersInBook}</p>

      {/* Botão Próximo - extremidade direita */}
      <button className="text-sm font-medium hover:opacity-70 transition-opacity">
        <span className="hidden lg:inline">Próximo</span>
        <span>→</span>
      </button>
    </footer>
  );
};

export default Footer;
