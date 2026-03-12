import { ThemeMode } from '../theme/theme';

export interface HomeScreenTheme {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  muted: string;
  accent: string;
  accentAlt: string;
  accentWarm: string;
  border: string;
  glowOne: string;
  glowTwo: string;
  glowThree: string;
}

export const getHomeScreenTheme = (mode: ThemeMode): HomeScreenTheme => {
  return mode === ThemeMode.Dark
    ? {
        background: '#1A1F1A',
        surface: '#2A3329',
        surfaceAlt: '#232B23',
        text: '#E8EDE0',
        muted: '#A3B18A',
        accent: '#6B8E23',
        accentAlt: '#A3B18A',
        accentWarm: '#DAD7CD',
        border: 'rgba(107, 142, 35, 0.2)',
        glowOne: 'rgba(107, 142, 35, 0.15)',
        glowTwo: 'rgba(163, 177, 138, 0.12)',
        glowThree: 'rgba(88, 129, 87, 0.1)',
      }
    : {
        background: '#F5F7F0',
        surface: '#FFFFFF',
        surfaceAlt: '#E8EDE0',
        text: '#3A4A3D',
        muted: '#6B7C6E',
        accent: '#588157',
        accentAlt: '#A3B18A',
        accentWarm: '#DAD7CD',
        border: 'rgba(88, 129, 87, 0.15)',
        glowOne: 'rgba(163, 177, 138, 0.2)',
        glowTwo: 'rgba(88, 129, 87, 0.15)',
        glowThree: 'rgba(218, 215, 205, 0.25)',
      };
};
