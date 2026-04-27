export const bookTypography = {
  fontFamily: 'Georgia, "Times New Roman", serif',
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

export const getBookFontStyle = (fontSize: string = bookTypography.scales.base): React.CSSProperties => ({
  fontFamily: bookTypography.fontFamily,
  fontSize,
  lineHeight: bookTypography.lineHeight,
});

export const bookFontClasses = {
  base: 'font-serif',
  heading: 'font-serif',
  body: 'font-serif',
  small: 'font-serif text-sm',
  large: 'font-serif text-lg'
};

export const getBookFontStyleByScale = (scale: keyof typeof bookTypography.scales): React.CSSProperties => ({
  fontFamily: bookTypography.fontFamily,
  fontSize: bookTypography.scales[scale],
  lineHeight: bookTypography.lineHeight,
});
