/**
 * Typography configuration for the Divine Comedy reader
 * Defines font family, scales, and styling for book content
 */
export const bookTypography = {
  fontFamily: '"HaboroContrast", Georgia, "Times New Roman", serif',
  scales: {
    xs: '14px',
    sm: '16px',
    base: '18px',
    lg: '20px',
    xl: '24px',
    '2xl': '30px'
  },
  lineHeight: '1.8',
  paragraphIndent: '2em'
};

/**
 * Gets book font style with custom font size
 * 
 * @param {string} fontSize - Font size to use (defaults to base)
 * @returns {React.CSSProperties} CSS properties object
 */
export const getBookFontStyle = (fontSize: string = bookTypography.scales.base): React.CSSProperties => ({
  fontFamily: bookTypography.fontFamily,
  fontSize,
  lineHeight: bookTypography.lineHeight,
});

/**
 * CSS class names for different book typography styles
 * Used with Tailwind CSS classes
 */
export const bookFontClasses = {
  base: 'font-serif',
  heading: 'font-serif',
  body: 'font-serif',
  small: 'font-serif text-sm',
  large: 'font-serif text-lg'
};

/**
 * Gets book font style by predefined scale
 * 
 * @param {keyof typeof bookTypography.scales} scale - Font scale to use
 * @returns {React.CSSProperties} CSS properties object
 */
export const getBookFontStyleByScale = (scale: keyof typeof bookTypography.scales): React.CSSProperties => ({
  fontFamily: bookTypography.fontFamily,
  fontSize: bookTypography.scales[scale],
  lineHeight: bookTypography.lineHeight,
});
