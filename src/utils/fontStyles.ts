export const getBookFontStyle = (fontSize: string = '18px'): React.CSSProperties => ({
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize,
  lineHeight: '1.8',
});

export const bookFontClasses = {
  base: 'font-serif'
};
