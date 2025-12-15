import { Platform } from 'react-native';

export const pinkTheme = {
  name: 'pink',
  fonts: {
    // Matches web: Josefin Sans, Borel, JetBrains Mono
    primary: {
      thin: { family: 'JosefinSans-Thin', source: 'https://fonts.gstatic.com/s/josefinsans/v34/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_DjRXME.ttf' },
      extralight: { family: 'JosefinSans-ExtraLight', source: 'https://fonts.gstatic.com/s/josefinsans/v34/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_LjQXME.ttf' },
      light: { family: 'JosefinSans-Light', source: 'https://fonts.gstatic.com/s/josefinsans/v34/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_GbQXME.ttf' },
      regular: { family: 'JosefinSans-Regular', source: 'https://fonts.gstatic.com/s/josefinsans/v34/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_DjQXME.ttf' },
      medium: { family: 'JosefinSans-Medium', source: 'https://fonts.gstatic.com/s/josefinsans/v34/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_ArQXME.ttf' },
      semibold: { family: 'JosefinSans-SemiBold', source: 'https://fonts.gstatic.com/s/josefinsans/v34/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_ObXXME.ttf' },
      bold: { family: 'JosefinSans-Bold', source: 'https://fonts.gstatic.com/s/josefinsans/v34/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_N_XXME.ttf' },
    },
    secondary: {
      // Borel only has one weight
      regular: { family: 'Borel', source: 'https://fonts.gstatic.com/s/borel/v10/6qLOKZsftAPisgsh.ttf' },
    },
    monospace: {
      thin: { family: 'JetBrainsMono-Thin', source: 'https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yK1jPQ.ttf' },
      extralight: { family: 'JetBrainsMono-ExtraLight', source: 'https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8SKxjPQ.ttf' },
      light: { family: 'JetBrainsMono-Light', source: 'https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8lqxjPQ.ttf' },
      regular: { family: 'JetBrainsMono-Regular', source: 'https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPQ.ttf' },
      medium: { family: 'JetBrainsMono-Medium', source: 'https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8-qxjPQ.ttf' },
      semibold: { family: 'JetBrainsMono-SemiBold', source: 'https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8FqtjPQ.ttf' },
      bold: { family: 'JetBrainsMono-Bold', source: 'https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8L6tjPQ.ttf' },
      extrabold: { family: 'JetBrainsMono-ExtraBold', source: 'https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8SKtjPQ.ttf' },
    },
  },
  
  colors: {
    // Primary palette (matches web --primary-color: #CC0C49)
    primary: '#CC0C49',
    primaryAccent: '#FF6B81',
    primaryLight: '#F9A8D4',
    primaryDark: '#BE185D',
    
    // Secondary palette (matches web --secondary-color: #4F9C46)
    secondary: '#4F9C46',
    secondaryAccent: '#67B55E',
    
    // Tertiary palette (matches web --tertiary-color: #7663F2)
    tertiary: '#7663F2',
    tertiaryAccent: '#A49BDE',
    
    // Semantic colors
    success: '#10b981',
    warning: '#fbbf24',
    error: '#ef4444',
    info: '#3B82F6',
    
    // Neutral colors (matches web surface colors)
    background: '#BD4F6C',
    surface: '#EE9480',
    surfaceAccent: '#E07BA2',
    card: '#EE9480',
    
    // Text colors (matches web --text-color: #853251)
    text: '#853251',
    textContrast: '#ecf3fe',
    
    // Border colors (matches web --border-color)
    border: '#155946',
    borderLight: '#f3f4f6',
    
    // Overlay
    backdrop: 'rgba(31, 41, 55, 0.5)',
    overlay: 'rgba(31, 41, 55, 0.3)',
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
        thin: 'JosefinSans-Thin',
        extralight: 'JosefinSans-ExtraLight',
        light: 'JosefinSans-Light',
        regular: 'JosefinSans-Regular',
        medium: 'JosefinSans-Medium',
        semibold: 'JosefinSans-SemiBold',
        bold: 'JosefinSans-Bold',
      },
      secondary: {
        regular: 'Borel',
      },
      monospace: {
        thin: 'JetBrainsMono-Thin',
        extralight: 'JetBrainsMono-ExtraLight',
        light: 'JetBrainsMono-Light',
        regular: 'JetBrainsMono-Regular',
        medium: 'JetBrainsMono-Medium',
        semibold: 'JetBrainsMono-SemiBold',
        bold: 'JetBrainsMono-Bold',
        extrabold: 'JetBrainsMono-ExtraBold',
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
    sm: 4,      // Similar to modern theme
    md: 6,
    lg: 8,
    xl: 12,
    xxl: 16,
    full: 9999,
  },
  
  shadows: {
    none: {},
    sm: Platform.select({
      ios: {
        shadowColor: '#EC4899',
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
        shadowColor: '#EC4899',
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
        shadowColor: '#EC4899',
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
        shadowColor: '#EC4899',
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
    backgroundColor: '#CC0C49',
  },
};
