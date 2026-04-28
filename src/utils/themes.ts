/**
 * Interface defining a book theme with colors and metadata
 */
export interface BookTheme {
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    shadow: string;
  };
}

/**
 * Interface defining theme variants (light/dark) for a book
 */
export interface ThemeVariants {
  light: BookTheme;
  dark: BookTheme;
}

/**
 * Interface defining all book themes
 */
export interface BookThemes {
  inferno: ThemeVariants;
  purgatory: ThemeVariants;
  paradise: ThemeVariants;
}

/**
 * Inferno Light Theme - Brutal, sanguine, despairing
 * Predominant colors: reds
 */
const infernoLight: BookTheme = {
  name: 'Inferno - Light',
  description: 'Brutal and sanguine theme of Inferno in light tones',
  colors: {
    primary: '#DC2626',      // strong red
    secondary: '#EF4444',    // vibrant red
    accent: '#FCA5A5',       // light red
    background: '#FEF2F2',   // very light red background
    surface: '#FEE2E2',      // light red surface
    text: '#7F1D1D',         // dark red text
    textSecondary: '#991B1B', // secondary red text
    border: '#FCA5A5',       // light red border
    shadow: 'rgba(220, 38, 38, 0.1)' // red shadow
  }
};

/**
 * Inferno Dark Theme - Brutal, sanguine, despairing
 * Predominant colors: dark reds
 */
const infernoDark: BookTheme = {
  name: 'Inferno - Dark',
  description: 'Brutal and sanguine theme of Inferno in dark tones',
  colors: {
    primary: '#7F1D1D',      // very dark red
    secondary: '#991B1B',    // dark red
    accent: '#DC2626',       // medium red
    background: '#1A0505',   // black background with red
    surface: '#2D0A0A',     // very dark red surface
    text: '#FCA5A5',         // light red text
    textSecondary: '#F87171', // secondary red text
    border: '#7F1D1D',       // dark red border
    shadow: 'rgba(127, 29, 29, 0.3)' // dark red shadow
  }
};

/**
 * Purgatory Light Theme - Sad, static, neutral
 * Predominant colors: greens
 */
const purgatoryLight: BookTheme = {
  name: 'Purgatory - Light',
  description: 'Sad and neutral theme of Purgatory in light tones',
  colors: {
    primary: '#059669',      // forest green
    secondary: '#10B981',    // emerald green
    accent: '#6EE7B7',       // light green
    background: '#F0FDF4',   // very light green background
    surface: '#DCFCE7',      // light green surface
    text: '#064E3B',         // dark green text
    textSecondary: '#047857', // secondary green text
    border: '#6EE7B7',       // light green border
    shadow: 'rgba(5, 150, 105, 0.1)' // green shadow
  }
};

/**
 * Purgatory Dark Theme - Sad, static, neutral
 * Predominant colors: dark greens
 */
const purgatoryDark: BookTheme = {
  name: 'Purgatory - Dark',
  description: 'Sad and neutral theme of Purgatory in dark tones',
  colors: {
    primary: '#064E3B',      // very dark green
    secondary: '#047857',    // dark green
    accent: '#059669',       // medium green
    background: '#0A1F1A',   // black background with green
    surface: '#1A2E2A',      // very dark green surface
    text: '#6EE7B7',         // light green text
    textSecondary: '#34D399', // secondary green text
    border: '#064E3B',       // dark green border
    shadow: 'rgba(6, 78, 59, 0.3)' // dark green shadow
  }
};

/**
 * Paradise Light Theme - Joyful, sublime, celestial
 * Predominant colors: blues
 */
const paradiseLight: BookTheme = {
  name: 'Paradise - Light',
  description: 'Joyful and celestial theme of Paradise in light tones',
  colors: {
    primary: '#2563EB',      // sky blue
    secondary: '#3B82F6',    // bright blue
    accent: '#93C5FD',       // light blue
    background: '#EFF6FF',   // very light blue background
    surface: '#DBEAFE',      // light blue surface
    text: '#1E3A8A',         // dark blue text
    textSecondary: '#1D4ED8', // secondary blue text
    border: '#93C5FD',       // light blue border
    shadow: 'rgba(37, 99, 235, 0.1)' // blue shadow
  }
};

/**
 * Paradise Dark Theme - Joyful, sublime, celestial
 * Predominant colors: dark blues
 */
const paradiseDark: BookTheme = {
  name: 'Paradise - Dark',
  description: 'Joyful and celestial theme of Paradise in dark tones',
  colors: {
    primary: '#1E3A8A',      // very dark blue
    secondary: '#1D4ED8',    // dark blue
    accent: '#2563EB',       // medium blue
    background: '#0F172A',   // very dark blue background
    surface: '#1E293B',      // dark blue surface
    text: '#93C5FD',         // light blue text
    textSecondary: '#60A5FA', // secondary blue text
    border: '#1E3A8A',       // dark blue border
    shadow: 'rgba(30, 58, 138, 0.3)' // dark blue shadow
  }
};

/**
 * Export all themes organized by book and variant
 */
export const themes: BookThemes = {
  inferno: {
    light: infernoLight,
    dark: infernoDark
  },
  purgatory: {
    light: purgatoryLight,
    dark: purgatoryDark
  },
  paradise: {
    light: paradiseLight,
    dark: paradiseDark
  }
};

/**
 * Gets theme for specific book and variant
 * 
 * @param {keyof BookThemes} book - The book to get theme for
 * @param {'light' | 'dark'} variant - The theme variant
 * @returns {BookTheme} The requested theme
 */
export const getTheme = (book: keyof BookThemes, variant: 'light' | 'dark'): BookTheme => {
  return themes[book][variant];
};

/**
 * Gets all available themes
 * 
 * @returns {BookThemes} All themes organized by book
 */
export const getAllThemes = (): BookThemes => {
  return themes;
};

/**
 * Type definition for book types
 */
export type BookType = 'inferno' | 'purgatory' | 'paradise';

/**
 * Type definition for theme variants
 */
export type ThemeVariant = 'light' | 'dark';
