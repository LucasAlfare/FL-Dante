// Book configuration
export const BOOK_CHAPTERS = {
  inferno: 34,
  purgatory: 33,
  paradise: 33
} as const;

// Book name mappings - mapeamento dos nomes internos para os nomes no JSON
export const getBookName = (book: string): string => {
  switch (book) {
    case 'inferno': return 'Inferno';
    case 'purgatory': return 'Purgatório';
    case 'paradise': return 'Paraíso';
    default: return book;
  }
};

// Mapeamento reverso - dos nomes do JSON para os nomes internos
export const getBookKey = (name: string): string => {
  switch (name) {
    case 'Inferno': return 'inferno';
    case 'Purgatório': return 'purgatory';
    case 'Paraíso': return 'paradise';
    default: return name.toLowerCase();
  }
};

// Text normalization utilities
export const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

export const normalizeBookName = (book: string): string => {
  return book
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
};
