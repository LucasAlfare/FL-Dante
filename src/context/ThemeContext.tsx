import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getTheme } from '../utils/themes';
import type { BookTheme, ThemeVariant, BookType } from '../utils/themes';
import { useReading } from './ReadingContext';

interface ThemeState {
  currentTheme: BookTheme;
  variant: ThemeVariant;
  isAutoMode: boolean;
}

interface ThemeContextType {
  state: ThemeState;
  toggleVariant: () => void;
  setVariant: (variant: ThemeVariant) => void;
  toggleAutoMode: () => void;
  setAutoMode: (enabled: boolean) => void;
  getCurrentBookTheme: (book: BookType) => BookTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { state: readingState } = useReading();
  const [variant, setVariant] = useState<ThemeVariant>('light');
  const [isAutoMode, setIsAutoMode] = useState(true);

  // Get current theme based on book and variant
  const getCurrentTheme = (): BookTheme => {
    return getTheme(readingState.currentBook, variant);
  };

  const currentTheme = getCurrentTheme();

  const toggleVariant = (): void => {
    setVariant(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setVariantExplicit = (newVariant: ThemeVariant): void => {
    setVariant(newVariant);
  };

  const toggleAutoMode = (): void => {
    setIsAutoMode(prev => !prev);
  };

  const setAutoModeExplicit = (enabled: boolean): void => {
    setIsAutoMode(enabled);
  };

  const getCurrentBookTheme = (book: BookType): BookTheme => {
    return getTheme(book, variant);
  };

  // Apply CSS variables whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    const colors = currentTheme.colors;
    
    // Apply CSS custom properties
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-surface', colors.surface);
    root.style.setProperty('--color-text', colors.text);
    root.style.setProperty('--color-text-secondary', colors.textSecondary);
    root.style.setProperty('--color-border', colors.border);
    root.style.setProperty('--color-shadow', colors.shadow);
    
    // Apply theme class to body for additional styling
    document.body.className = `theme-${readingState.currentBook} theme-${variant}`;
    
  }, [currentTheme, readingState.currentBook, variant]);

  const state: ThemeState = {
    currentTheme,
    variant,
    isAutoMode
  };

  return (
    <ThemeContext.Provider
      value={{
        state,
        toggleVariant,
        setVariant: setVariantExplicit,
        toggleAutoMode,
        setAutoMode: setAutoModeExplicit,
        getCurrentBookTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
