import { ThemeMode } from '../theme/theme';

export interface ChannelCardTheme {
  card: string;
  cardGradient: string;
  text: string;
  muted: string;
  border: string;
  accent: string;
  accentGlow: string;
  overlay: string;
  shadow: string;
}

export const getChannelCardTheme = (mode: ThemeMode): ChannelCardTheme => {
  return mode === ThemeMode.Dark
    ? {
        card: '#2A3329',
        cardGradient: '#232B23',
        text: '#E8EDE0',
        muted: '#A3B18A',
        border: 'rgba(107, 142, 35, 0.3)',
        accent: '#6B8E23',
        accentGlow: 'rgba(107, 142, 35, 0.4)',
        overlay: 'rgba(26, 31, 26, 0.5)',
        shadow: '#1A1F1A',
      }
    : {
        card: '#FFFFFF',
        cardGradient: '#F5F7F0',
        text: '#3A4A3D',
        muted: '#6B7C6E',
        border: 'rgba(88, 129, 87, 0.2)',
        accent: '#588157',
        accentGlow: 'rgba(88, 129, 87, 0.3)',
        overlay: 'rgba(58, 74, 61, 0.3)',
        shadow: '#3A4A3D',
      };
};
