export const bookFontFamily = 'Georgia, "Times New Roman", serif';

export const getBookFontStyle = (fontSize: string = '18px'): React.CSSProperties => ({
  fontFamily: bookFontFamily,
  fontSize,
  lineHeight: '1.8',
});

export const bookFontClasses = {
  base: 'font-serif',
  sizes: {
    xs: 'text-xs',
    sm: 'text-sm', 
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
  }
};
