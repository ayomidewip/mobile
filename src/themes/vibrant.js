import { Platform } from 'react-native';

export const vibrantTheme = {
  name: 'vibrant',
  fonts: {
    // Matches web: Gloria Hallelujah, Bungee Spice, VT323 (all single weight)
    primary: {
      regular: { family: 'GloriaHallelujah', source: 'https://fonts.gstatic.com/s/gloriahallelujah/v24/LYjYdHv3kUk9BMV96EIswT9DIbW-MLSy.ttf' },
    },
    secondary: {
      regular: { family: 'BungeeSpice', source: 'https://fonts.gstatic.com/s/bungeespice/v15/nwpTtK2nIhxE0q-IwgSpZBqCzw.ttf' },
    },
    monospace: {
      regular: { family: 'VT323', source: 'https://fonts.gstatic.com/s/vt323/v18/pxiKyp0ihIEF2hsY.ttf' },
    },
  },
  
  colors: {
    // Primary palette (matches web --primary-color: #2176AE)
    primary: '#2176AE',
    primaryAccent: '#175178',
    primaryLight: '#60a5fa',
    primaryDark: '#175178',
    
    // Secondary palette (matches web --secondary-color: #f97316)
    secondary: '#f97316',
    secondaryAccent: '#c2410c',
    
    // Tertiary palette (matches web --tertiary-color: #D12B1F)
    tertiary: '#D12B1F',
    tertiaryAccent: '#E83151',
    
    // Semantic colors
    success: '#16a34a',
    warning: '#f59e0b',
    error: '#dc2626',
    info: '#2176AE',
    
    // Neutral colors (matches web surface colors)
    background: '#F2822C',
    surface: '#FBB13C',
    surfaceAccent: '#a8121e82',
    card: '#FBB13C',
    
    // Text colors (matches web --text-color: #0A6270)
    text: '#0A6270',
    textContrast: '#FFB885',
    
    // Border colors (matches web --border-color: #2176AE)
    border: '#2176AE',
    borderLight: '#fed7aa',
    
    // Overlay
    backdrop: 'rgba(239, 68, 68, 0.4)',
    overlay: 'rgba(239, 68, 68, 0.2)',
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 48,
  },
  
  typography: {
    fonts: {
      primary: {
        regular: 'GloriaHallelujah',
      },
      secondary: {
        regular: 'BungeeSpice',
      },
      monospace: {
        regular: 'VT323',
      },
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
      h1: 40,
      h2: 32,
      h3: 28,
      h4: 24,
      h5: 20,
      h6: 18,
    },
    fontWeight: {
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  borderRadius: {
    none: 0,
    sm: 8,      // checkbox-radius: 0.5rem (8px)
    md: 12,     // input-radius: 0.75rem (12px)
    lg: 16,     // button-radius/border-radius: 1rem (16px)
    xl: 24,     // card-radius: 1.5rem (24px)
    xxl: 32,
    full: 9999, // progress-radius: pill shape
  },
  
  shadows: {
    none: {},
    sm: Platform.select({
      ios: {
        shadowColor: '#E11D48',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 1.0,
      },
      android: {
        elevation: 2,
      },
    }),
    md: Platform.select({
      ios: {
        shadowColor: '#E11D48',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2.22,
      },
      android: {
        elevation: 4,
      },
    }),
    lg: Platform.select({
      ios: {
        shadowColor: '#E11D48',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 8,
      },
    }),
    xl: Platform.select({
      ios: {
        shadowColor: '#E11D48',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  
  animation: {
    duration: {
      fast: 150,
      normal: 250,
      slow: 350,
    },
  },
  
  statusBar: {
    barStyle: 'light-content',
    backgroundColor: '#2176AE',
  },
};
