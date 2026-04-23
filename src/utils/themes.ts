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

export interface ThemeVariants {
  light: BookTheme;
  dark: BookTheme;
}

export interface BookThemes {
  inferno: ThemeVariants;
  purgatory: ThemeVariants;
  paradise: ThemeVariants;
}

// Inferno Theme - Brutal, sanguinolento, desesperador
// Tons predominantes: vermelhos
const infernoLight: BookTheme = {
  name: 'Inferno - Claro',
  description: 'Tema brutal e sanguinolento do Inferno em tons claros',
  colors: {
    primary: '#DC2626',      // vermelho forte
    secondary: '#EF4444',    // vermelho vibrante
    accent: '#FCA5A5',       // vermelho claro
    background: '#FEF2F2',   // fundo vermelho muito claro
    surface: '#FEE2E2',      // superfície vermelha clara
    text: '#7F1D1D',         // texto vermelho escuro
    textSecondary: '#991B1B', // texto secundário vermelho
    border: '#FCA5A5',       // borda vermelha clara
    shadow: 'rgba(220, 38, 38, 0.1)' // sombra vermelha
  }
};

const infernoDark: BookTheme = {
  name: 'Inferno - Escuro',
  description: 'Tema brutal e sanguinolento do Inferno em tons escuros',
  colors: {
    primary: '#7F1D1D',      // vermelho muito escuro
    secondary: '#991B1B',    // vermelho escuro
    accent: '#DC2626',       // vermelho médio
    background: '#1A0505',   // fundo preto com vermelho
    surface: '#2D0A0A',     // superfície vermelha muito escura
    text: '#FCA5A5',         // texto vermelho claro
    textSecondary: '#F87171', // texto secundário vermelho
    border: '#7F1D1D',       // borda vermelha escura
    shadow: 'rgba(127, 29, 29, 0.3)' // sombra vermelha escura
  }
};

// Purgatory Theme - Triste, parado, neutro
// Tons predominantes: verdes
const purgatoryLight: BookTheme = {
  name: 'Purgatório - Claro',
  description: 'Tema triste e neutro do Purgatório em tons claros',
  colors: {
    primary: '#059669',      // verde floresta
    secondary: '#10B981',    // verde esmeralda
    accent: '#6EE7B7',       // verde claro
    background: '#F0FDF4',   // fundo verde muito claro
    surface: '#DCFCE7',      // superfície verde clara
    text: '#064E3B',         // texto verde escuro
    textSecondary: '#047857', // texto secundário verde
    border: '#6EE7B7',       // borda verde clara
    shadow: 'rgba(5, 150, 105, 0.1)' // sombra verde
  }
};

const purgatoryDark: BookTheme = {
  name: 'Purgatório - Escuro',
  description: 'Tema triste e neutro do Purgatório em tons escuros',
  colors: {
    primary: '#064E3B',      // verde muito escuro
    secondary: '#047857',    // verde escuro
    accent: '#059669',       // verde médio
    background: '#0A1F1A',   // fundo preto com verde
    surface: '#1A2E2A',      // superfície verde muito escura
    text: '#6EE7B7',         // texto verde claro
    textSecondary: '#34D399', // texto secundário verde
    border: '#064E3B',       // borda verde escura
    shadow: 'rgba(6, 78, 59, 0.3)' // sombra verde escura
  }
};

// Paradise Theme - Alegre, sublime, celestial
// Tons predominantes: azuis
const paradiseLight: BookTheme = {
  name: 'Paraíso - Claro',
  description: 'Tema alegre e celestial do Paraíso em tons claros',
  colors: {
    primary: '#2563EB',      // azul céu
    secondary: '#3B82F6',    // azul brilhante
    accent: '#93C5FD',       // azul claro
    background: '#EFF6FF',   // fundo azul muito claro
    surface: '#DBEAFE',      // superfície azul clara
    text: '#1E3A8A',         // texto azul escuro
    textSecondary: '#1D4ED8', // texto secundário azul
    border: '#93C5FD',       // borda azul clara
    shadow: 'rgba(37, 99, 235, 0.1)' // sombra azul
  }
};

const paradiseDark: BookTheme = {
  name: 'Paraíso - Escuro',
  description: 'Tema alegre e celestial do Paraíso em tons escuros',
  colors: {
    primary: '#1E3A8A',      // azul muito escuro
    secondary: '#1D4ED8',    // azul escuro
    accent: '#2563EB',       // azul médio
    background: '#0F172A',   // fundo azul muito escuro
    surface: '#1E293B',      // superfície azul escuro
    text: '#93C5FD',         // texto azul claro
    textSecondary: '#60A5FA', // texto secundário azul
    border: '#1E3A8A',       // borda azul escura
    shadow: 'rgba(30, 58, 138, 0.3)' // sombra azul escura
  }
};

// Export all themes
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

// Helper functions
export const getTheme = (book: keyof BookThemes, variant: 'light' | 'dark'): BookTheme => {
  return themes[book][variant];
};

export const getAllThemes = (): BookThemes => {
  return themes;
};

// Type guards
export type BookType = 'inferno' | 'purgatory' | 'paradise';
export type ThemeVariant = 'light' | 'dark';
