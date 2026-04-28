/**
 * Book configuration constants
 * Defines the number of chapters in each book of Divine Comedy
 */
export const BOOK_CHAPTERS = {
  inferno: 34,
  purgatory: 33,
  paradise: 33
} as const;

/**
 * Maps internal book keys to their display names in JSON.
 * Converts internal English keys to Portuguese display names.
 * 
 * @param {string} book - Internal book key (inferno, purgatory, paradise)
 * @returns {string} Portuguese display name for the book
 */
export const getBookName = (book: string): string => {
  switch (book) {
    case 'inferno': return 'Inferno';
    case 'purgatory': return 'Purgatório';
    case 'paradise': return 'Paraíso';
    default: return book;
  }
};

/**
 * Maps JSON book names back to internal keys.
 * Converts Portuguese display names to internal English keys.
 * 
 * @param {string} name - Portuguese book name from JSON
 * @returns {string} Internal book key
 */
export const getBookKey = (name: string): string => {
  switch (name) {
    case 'Inferno': return 'inferno';
    case 'Purgatório': return 'purgatory';
    case 'Paraíso': return 'paradise';
    default: return name.toLowerCase();
  }
};

/**
 * Normalizes text for search functionality.
 * Converts to lowercase and removes diacritics for consistent matching.
 * 
 * @param {string} text - Text to normalize
 * @returns {string} Normalized text
 */
export const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

/**
 * Normalizes book names for URL/path usage.
 * Converts to lowercase, removes diacritics, and strips non-alphanumeric characters.
 * 
 * @param {string} book - Book name to normalize
 * @returns {string} Normalized book name suitable for URLs
 */
export const normalizeBookName = (book: string): string => {
  return book
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
};
