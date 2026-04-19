
interface SupportPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

const SupportPanel = ({ isOpen, onToggle }: SupportPanelProps) => {
  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`fixed right-4 top-20 z-50 p-3 rounded-lg transition-all duration-300 ${
          isOpen ? 'translate-x-[-320px]' : 'translate-x-0'
        }`}
        title={isOpen ? 'Fechar painel de apoio' : 'Abrir painel de apoio'}
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          )}
        </svg>
      </button>

      {/* Support Panel */}
      <aside className={`fixed right-0 top-16 bottom-16 w-80 bg-white border-l border-gray-200 overflow-y-auto z-10 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
      <div className="p-6 font-serif text-sm">
        {/* Top divider */}
        <div className="flex items-center justify-center py-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <div className="w-2 h-2 bg-gray-400 transform rotate-45 mx-3"></div>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Resumo do Canto Section */}
        <section className="mb-8">
          <h2 className="font-bold text-base mb-4" style={{ fontVariant: 'small-caps' }}>
            Resumo do Canto
          </h2>
          <p className="text-gray-700 leading-relaxed text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </section>

        {/* Middle divider */}
        <div className="flex items-center justify-center py-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <div className="w-2 h-2 bg-gray-400 transform rotate-45 mx-3"></div>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Notas Section */}
        <section className="mb-8">
          <h2 className="font-bold text-base mb-4" style={{ fontVariant: 'small-caps' }}>
            Notas
          </h2>
          <div className="space-y-3 text-left">
            <div>
              <span className="font-bold">Virgílio:</span>
              <span className="text-gray-700 ml-2">Poeta romano que serve como guia de Dante através do Inferno e Purgatório. Sua obra "Eneida" foi fundamental para a literatura medieval.</span>
            </div>
            <div>
              <span className="font-bold">Beatriz:</span>
              <span className="text-gray-700 ml-2">Amor platônico de Dante, que o resgata e o guia através do Paraíso. Representa a teologia e a revelação divina.</span>
            </div>
            <div>
              <span className="font-bold">Selva escura:</span>
              <span className="text-gray-700 ml-2">Símbolo do pecado e da perdição espiritual onde Dante se encontra no início de sua jornada metafísica.</span>
            </div>
            <div>
              <span className="font-bold">Contrapasso:</span>
              <span className="text-gray-700 ml-2">Princípio de justiça divina onde o castigo dos condenados espelha simbolicamente seus pecados cometidos na vida terrena.</span>
            </div>
            <div>
              <span className="font-bold">Stige:</span>
              <span className="text-gray-700 ml-2">Quinto círculo do Inferno, onde os iracundos e preguiçosos são imersos no pântano infernal.</span>
            </div>
          </div>
        </section>

        {/* Bottom divider */}
        <div className="flex items-center justify-center py-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <div className="w-2 h-2 bg-gray-400 transform rotate-45 mx-3"></div>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
      </div>
    </aside>
    </>
  );
};

export default SupportPanel;
