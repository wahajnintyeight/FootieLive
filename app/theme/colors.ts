import { ThemeMode } from './theme';

// Earthy Forest Hues Color Palette
// Based on natural, grounded tones that evoke tranquility and sophistication
export const themeColors = {
  [ThemeMode.Light]: {
    background: '#F5F7F0',        // Soft off-white with green undertone
    surface: '#FFFFFF',            // Pure white for cards
    surfaceAlt: '#E8EDE0',         // Light sage for secondary surfaces
    border: '#C8D4BA',             // Soft sage border
    text: '#3A4A3D',               // Deep forest text
    mutedText: '#6B7C6E',          // Muted forest gray
    accent: '#588157',             // Primary forest green
    accentAlt: '#A3B18A',          // Sage green accent
    accentWarm: '#DAD7CD',         // Warm beige accent
    success: '#6B8E23',            // Olive green
    warning: '#B8A389',            // Warm taupe
    error: '#8B6F47',              // Earthy brown
    iconButton: '#E8EDE0',         // Light sage button
    highlight: '#A3B18A',          // Sage highlight
  },
  [ThemeMode.Dark]: {
    background: '#1A1F1A',         // Deep forest night
    surface: '#2A3329',            // Dark moss surface
    surfaceAlt: '#232B23',         // Darker moss variant
    border: '#3F4A3F',             // Muted forest border
    text: '#E8EDE0',               // Light sage text
    mutedText: '#A3B18A',          // Sage muted text
    accent: '#6B8E23',             // Vibrant olive green
    accentAlt: '#A3B18A',          // Sage green accent
    accentWarm: '#DAD7CD',         // Warm beige accent
    success: '#7FA650',            // Bright olive
    warning: '#C9B896',            // Light taupe
    error: '#A68A5C',              // Light brown
    iconButton: '#3A4A3D',         // Deep forest button
    highlight: '#588157',          // Forest green highlight
  },
};

export type ThemeColors = (typeof themeColors)[ThemeMode.Light];
