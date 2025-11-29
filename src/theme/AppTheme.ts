import React, { createContext, useContext } from 'react';

export type AppTheme = {
  isDark: boolean;
  colors: {
    background: string;
    card: string;
    cardSoft: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    accentSoft: string;
    border: string;
    pillBg: string;
    pillBgActive: string;
  };
};

export const darkTheme: AppTheme = {
  isDark: false,
  colors: {
    // light, slightly blue-tinted background similar to reference
    background: '#F4F6FB',
    // main card surfaces (white)
    card: '#FFFFFF',
    // soft card / pill backgrounds
    cardSoft: '#EFF3FF',
    // primary text (dark navy)
    textPrimary: '#0F172A',
    // secondary text (muted gray)
    textSecondary: '#6B7280',
    // strong accent red for CTAs
    accent: '#E60000',
    // soft red for pills / backgrounds
    accentSoft: '#FFE4E4',
    // light border color
    border: '#E5E7EB',
    // pill background rails
    pillBg: '#E5E7EB',
    pillBgActive: '#FFFFFF',
  },
};

export type ThemeContextValue = {
  theme: AppTheme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useAppTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useAppTheme must be used within ThemeContext provider');
  }
  return ctx;
}
