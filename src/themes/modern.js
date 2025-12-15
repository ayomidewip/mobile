import { Platform } from 'react-native';

export const modernTheme = {
  name: 'modern',
  fonts: {
    // Matches web: Urbanist, Montserrat Alternates, JetBrains Mono
    primary: {
      thin: { family: 'Urbanist-Thin', source: 'https://fonts.gstatic.com/s/urbanist/v18/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDyx8fFg.ttf' },
      extralight: { family: 'Urbanist-ExtraLight', source: 'https://fonts.gstatic.com/s/urbanist/v18/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDSx4fFg.ttf' },
      light: { family: 'Urbanist-Light', source: 'https://fonts.gstatic.com/s/urbanist/v18/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDlR4fFg.ttf' },
      regular: { family: 'Urbanist-Regular', source: 'https://fonts.gstatic.com/s/urbanist/v18/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDyx4fFg.ttf' },
      medium: { family: 'Urbanist-Medium', source: 'https://fonts.gstatic.com/s/urbanist/v18/L0xjDF02iFML4hGCyOCpRdycFsGxSrqD-R4fFg.ttf' },
      semibold: { family: 'Urbanist-SemiBold', source: 'https://fonts.gstatic.com/s/urbanist/v18/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDFRkfFg.ttf' },
      bold: { family: 'Urbanist-Bold', source: 'https://fonts.gstatic.com/s/urbanist/v18/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDLBkfFg.ttf' },
      extrabold: { family: 'Urbanist-ExtraBold', source: 'https://fonts.gstatic.com/s/urbanist/v18/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDSxkfFg.ttf' },
      black: { family: 'Urbanist-Black', source: 'https://fonts.gstatic.com/s/urbanist/v18/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDYhkfFg.ttf' },
    },
    secondary: {
      thin: { family: 'MontserratAlternates-Thin', source: 'https://fonts.gstatic.com/s/montserratalternates/v18/mFThWacfw6zH4dthXcyms1lPpC8I_b0juU0xiKfV.ttf' },
      extralight: { family: 'MontserratAlternates-ExtraLight', source: 'https://fonts.gstatic.com/s/montserratalternates/v18/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xJIb1AA.ttf' },
      light: { family: 'MontserratAlternates-Light', source: 'https://fonts.gstatic.com/s/montserratalternates/v18/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xQIX1AA.ttf' },
      regular: { family: 'MontserratAlternates-Regular', source: 'https://fonts.gstatic.com/s/montserratalternates/v18/mFTvWacfw6zH4dthXcyms1lPpC8I_b0juU0J7A.ttf' },
      medium: { family: 'MontserratAlternates-Medium', source: 'https://fonts.gstatic.com/s/montserratalternates/v18/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xGIT1AA.ttf' },
      semibold: { family: 'MontserratAlternates-SemiBold', source: 'https://fonts.gstatic.com/s/montserratalternates/v18/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xNIP1AA.ttf' },
      bold: { family: 'MontserratAlternates-Bold', source: 'https://fonts.gstatic.com/s/montserratalternates/v18/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xUIL1AA.ttf' },
      extrabold: { family: 'MontserratAlternates-ExtraBold', source: 'https://fonts.gstatic.com/s/montserratalternates/v18/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xTIH1AA.ttf' },
      black: { family: 'MontserratAlternates-Black', source: 'https://fonts.gstatic.com/s/montserratalternates/v18/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xaID1AA.ttf' },
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
    // Primary palette (matches web --primary-color: #3F84E5)
    primary: '#3F84E5',
    primaryAccent: '#98B3E6',
    primaryLight: '#C6D8FF',
    primaryDark: '#2563EB',
    
    // Secondary palette (matches web --secondary-color: #F45D01)
    secondary: '#F45D01',
    secondaryAccent: '#FEB485',
    
    // Tertiary palette (matches web --tertiary-color: #8b5cf6)
    tertiary: '#8b5cf6',
    tertiaryAccent: '#7c3aed',
    
    // Semantic colors
    success: '#10b981',
    warning: '#fbbf24',
    error: '#ef4444',
    info: '#3B82F6',
    
    // Neutral colors (matches web surface colors)
    background: '#C6D8FF',
    surface: '#E2E7F3',
    surfaceAccent: '#f3f4f6',
    card: '#E2E7F3',
    
    // Text colors (matches web --text-color: #0C2F5A)
    text: '#0C2F5A',
    textContrast: '#C9DDF8',
    
    // Border colors (matches web --border-color)
    border: '#e5e7eb',
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
        thin: 'Urbanist-Thin',
        extralight: 'Urbanist-ExtraLight',
        light: 'Urbanist-Light',
        regular: 'Urbanist-Regular',
        medium: 'Urbanist-Medium',
        semibold: 'Urbanist-SemiBold',
        bold: 'Urbanist-Bold',
        extrabold: 'Urbanist-ExtraBold',
        black: 'Urbanist-Black',
      },
      secondary: {
        thin: 'MontserratAlternates-Thin',
        extralight: 'MontserratAlternates-ExtraLight',
        light: 'MontserratAlternates-Light',
        regular: 'MontserratAlternates-Regular',
        medium: 'MontserratAlternates-Medium',
        semibold: 'MontserratAlternates-SemiBold',
        bold: 'MontserratAlternates-Bold',
        extrabold: 'MontserratAlternates-ExtraBold',
        black: 'MontserratAlternates-Black',
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
    sm: 4,      // checkbox-radius: 0.25rem (4px)
    md: 6,      // border-radius: 0.375rem (6px)
    lg: 8,      // card-radius: 0.5rem (8px)
    xl: 12,
    xxl: 16,
    full: 9999,
  },
  
  shadows: {
    none: {},
    sm: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
      },
      android: {
        elevation: 2,
      },
    }),
    md: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
      },
      android: {
        elevation: 4,
      },
    }),
    lg: Platform.select({
      ios: {
        shadowColor: '#000',
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
        shadowColor: '#000',
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
    barStyle: 'dark-content',
    backgroundColor: '#C6D8FF',
  },
};
