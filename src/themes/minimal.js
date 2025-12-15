import { Platform } from 'react-native';

export const minimalTheme = {
  name: 'minimal',
  fonts: {
    // Matches web: Advent Pro, Syne Mono, Nova Mono
    primary: {
      thin: { family: 'AdventPro-Thin', source: 'https://fonts.gstatic.com/s/adventpro/v33/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLQyJPTA.ttf' },
      extralight: { family: 'AdventPro-ExtraLight', source: 'https://fonts.gstatic.com/s/adventpro/v33/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLwyNPTA.ttf' },
      light: { family: 'AdventPro-Light', source: 'https://fonts.gstatic.com/s/adventpro/v33/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLHSNPTA.ttf' },
      regular: { family: 'AdventPro-Regular', source: 'https://fonts.gstatic.com/s/adventpro/v33/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLQyNPTA.ttf' },
      medium: { family: 'AdventPro-Medium', source: 'https://fonts.gstatic.com/s/adventpro/v33/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLcSNPTA.ttf' },
      semibold: { family: 'AdventPro-SemiBold', source: 'https://fonts.gstatic.com/s/adventpro/v33/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLnSRPTA.ttf' },
      bold: { family: 'AdventPro-Bold', source: 'https://fonts.gstatic.com/s/adventpro/v33/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLpCRPTA.ttf' },
      extrabold: { family: 'AdventPro-ExtraBold', source: 'https://fonts.gstatic.com/s/adventpro/v33/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLwyRPTA.ttf' },
      black: { family: 'AdventPro-Black', source: 'https://fonts.gstatic.com/s/adventpro/v33/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpL6iRPTA.ttf' },
    },
    secondary: {
      // Syne Mono only has one weight
      regular: { family: 'SyneMono', source: 'https://fonts.gstatic.com/s/synemono/v16/K2FzfZNHj_FHBmRbFvHzIg.ttf' },
    },
    monospace: {
      // Nova Mono only has one weight
      regular: { family: 'NovaMono', source: 'https://fonts.gstatic.com/s/novamono/v23/Cn-0JtiGWQ5Ajb--MRKfYA.ttf' },
    },
  },
  
  colors: {
    // Primary palette (matches web --primary-color: #374151)
    primary: '#374151',
    primaryAccent: '#111827',
    primaryLight: '#6b7280',
    primaryDark: '#111827',
    
    // Secondary palette (matches web --secondary-color: #9ca3af)
    secondary: '#9ca3af',
    secondaryAccent: '#4b5563',
    
    // Tertiary palette (matches web --tertiary-color: #4b5563)
    tertiary: '#4b5563',
    tertiaryAccent: '#374151',
    
    // Semantic colors
    success: '#047857',
    warning: '#d97706',
    error: '#b91c1c',
    info: '#0EA5E9',
    
    // Neutral colors (matches web surface colors)
    background: '#f9fafb',
    surface: '#e9e8e8',
    surfaceAccent: '#f3f4f6',
    card: '#e9e8e8',
    
    // Text colors (matches web --text-color: #111827)
    text: '#111827',
    textContrast: '#e9e8e8',
    
    // Border colors (matches web --border-color)
    border: '#e5e7eb',
    borderLight: '#f3f4f6',
    
    // Overlay
    backdrop: 'rgba(55, 65, 81, 0.4)',
    overlay: 'rgba(55, 65, 81, 0.2)',
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
        thin: 'AdventPro-Thin',
        extralight: 'AdventPro-ExtraLight',
        light: 'AdventPro-Light',
        regular: 'AdventPro-Regular',
        medium: 'AdventPro-Medium',
        semibold: 'AdventPro-SemiBold',
        bold: 'AdventPro-Bold',
        extrabold: 'AdventPro-ExtraBold',
        black: 'AdventPro-Black',
      },
      secondary: {
        regular: 'SyneMono',
      },
      monospace: {
        regular: 'NovaMono',
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
    sm: 0,      // Minimal theme uses no border radius
    md: 0,
    lg: 0,
    xl: 0,
    xxl: 0,
    full: 9999, // Keep full for pills/circles
  },
  
  shadows: {
    none: {},
    sm: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 1.0,
      },
      android: {
        elevation: 1,
      },
    }),
    md: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2.0,
      },
      android: {
        elevation: 2,
      },
    }),
    lg: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 3.0,
      },
      android: {
        elevation: 4,
      },
    }),
    xl: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 4.0,
      },
      android: {
        elevation: 6,
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
    backgroundColor: '#f9fafb',
  },
};
