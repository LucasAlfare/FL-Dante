import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getTheme } from '../utils/themes';
import type { BookTheme, ThemeVariant, BookType } from '../utils/themes';
import { useReading } from './ReadingContext';

/**
 * Interface defining the current theme state
 */
interface ThemeState {
  currentTheme: BookTheme;
  variant: ThemeVariant;
  isAutoMode: boolean;
}

/**
 * Interface defining the theme context methods and state
 */
interface ThemeContextType {
  state: ThemeState;
  toggleVariant: () => void;
  setVariant: (variant: ThemeVariant) => void;
  toggleAutoMode: () => void;
  setAutoMode: (enabled: boolean) => void;
  getCurrentBookTheme: (book: BookType) => BookTheme;
}

/**
 * React context for managing application theme state and functionality.
 * Provides book-specific themes with light/dark variants and auto-mode support.
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Theme provider component that manages theme state and CSS custom properties.
 * 
 * This provider handles:
 * - Theme variant switching (light/dark)
 * - Auto-mode functionality
 * - Book-specific theme application
 * - CSS custom property updates for dynamic styling
 * 
 * @param {ReactNode} children - Child components to wrap with theme context
 * @component
 */
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { state: readingState } = useReading();
  const [variant, setVariant] = useState<ThemeVariant>('light');
  const [isAutoMode, setIsAutoMode] = useState(true);

  /**
   * Gets the current theme based on the active book and variant
   * @returns {BookTheme} The current book theme
   */
  const getCurrentTheme = (): BookTheme => {
    return getTheme(readingState.currentBook, variant);
  };

  const currentTheme = getCurrentTheme();

  /**
   * Toggles between light and dark theme variants
   */
  const toggleVariant = (): void => {
    setVariant(prev => prev === 'light' ? 'dark' : 'light');
  };

  /**
   * Sets a specific theme variant
   * @param {ThemeVariant} newVariant - The theme variant to set
   */
  const setVariantExplicit = (newVariant: ThemeVariant): void => {
    setVariant(newVariant);
  };

  /**
   * Toggles auto-mode on/off
   */
  const toggleAutoMode = (): void => {
    setIsAutoMode(prev => !prev);
  };

  /**
   * Sets auto-mode explicitly
   * @param {boolean} enabled - Whether auto-mode should be enabled
   */
  const setAutoModeExplicit = (enabled: boolean): void => {
    setIsAutoMode(enabled);
  };

  /**
   * Gets theme for a specific book
   * @param {BookType} book - The book type to get theme for
   * @returns {BookTheme} The theme for the specified book
   */
  const getCurrentBookTheme = (book: BookType): BookTheme => {
    return getTheme(book, variant);
  };

  /**
   * Applies CSS custom properties and body classes whenever theme changes.
   * Updates document root with theme colors and applies theme-specific classes.
   */
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

/**
 * Custom hook for accessing theme context.
 * Provides access to theme state and manipulation functions.
 * 
 * @returns {ThemeContextType} Theme context value
 * @throws {Error} If used outside of ThemeProvider
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
