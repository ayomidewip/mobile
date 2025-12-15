import { Platform } from 'react-native';

export const darkTheme = {
  name: 'dark',
  fonts: {
    // Matches web: Urbanist, Montserrat Alternates, Share Tech Mono
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
      // Share Tech Mono only has one weight
      regular: { family: 'ShareTechMono', source: 'https://fonts.gstatic.com/s/sharetechmono/v16/J7aHnp1uDWRBEqV98dVQztYldFc7pA.ttf' },
    },
  },
  
  colors: {
    // Primary palette (matches web --primary-color: #4D9BF9)
    primary: '#4D9BF9',
    primaryAccent: '#2563eb',
    primaryLight: '#60a5fa',
    primaryDark: '#1D4ED8',
    
    // Secondary palette (matches web --secondary-color: #FF570A)
    secondary: '#FF570A',
    secondaryAccent: '#8F2D00',
    
    // Tertiary palette (matches web --tertiary-color: #E2ADF2)
    tertiary: '#E2ADF2',
    tertiaryAccent: '#8E1CB0',
    
    // Semantic colors
    success: '#70B97C',
    warning: '#FFD400',
    error: '#E03616',
    info: '#4D9BF9',
    
    // Neutral colors (matches web surface colors)
    background: '#1f2937',
    surface: '#374151',
    surfaceAccent: '#4b5563',
    card: '#374151',
    
    // Text colors (matches web --text-color: #C9DDF8)
    text: '#C9DDF8',
    textContrast: '#0C2F5A',
    
    // Border colors (matches web --border-color: #60a5fa)
    border: '#60a5fa',
    borderLight: '#C9DDF8',
    
    // Overlay
    backdrop: 'rgba(0, 0, 0, 0.7)',
    overlay: 'rgba(0, 0, 0, 0.5)',
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
        regular: 'ShareTechMono',
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
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    full: 9999,
  },
  
  shadows: {
    none: {},
    sm: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
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
        shadowOpacity: 0.35,
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
        shadowOpacity: 0.4,
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
        shadowOpacity: 0.45,
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
    backgroundColor: '#1f2937',
  },
};
