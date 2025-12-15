import { Platform } from 'react-native';

export const adminTheme = {
  name: 'admin',
  fonts: {
    // Matches web: Jura, Kode Mono, Roboto Mono
    primary: {
      light: { family: 'Jura-Light', source: 'https://fonts.gstatic.com/s/jura/v34/z7NOdRfiaC4Vd8hhoPzfb5vBTP0D7auh.ttf' },
      regular: { family: 'Jura-Regular', source: 'https://fonts.gstatic.com/s/jura/v34/z7NOdRfiaC4Vd8hhoPzfb5vBTP1d7auh.ttf' },
      medium: { family: 'Jura-Medium', source: 'https://fonts.gstatic.com/s/jura/v34/z7NOdRfiaC4Vd8hhoPzfb5vBTP1v7auh.ttf' },
      semibold: { family: 'Jura-SemiBold', source: 'https://fonts.gstatic.com/s/jura/v34/z7NOdRfiaC4Vd8hhoPzfb5vBTP2D6quh.ttf' },
      bold: { family: 'Jura-Bold', source: 'https://fonts.gstatic.com/s/jura/v34/z7NOdRfiaC4Vd8hhoPzfb5vBTP266quh.ttf' },
    },
    secondary: {
      regular: { family: 'KodeMono-Regular', source: 'https://fonts.gstatic.com/s/kodemono/v4/A2BLn5pb0QgtVEPFnlYkkaoBgw4qv9odq5my9Do.ttf' },
      medium: { family: 'KodeMono-Medium', source: 'https://fonts.gstatic.com/s/kodemono/v4/A2BLn5pb0QgtVEPFnlYkkaoBgw4qv9odq6uy9Do.ttf' },
      semibold: { family: 'KodeMono-SemiBold', source: 'https://fonts.gstatic.com/s/kodemono/v4/A2BLn5pb0QgtVEPFnlYkkaoBgw4qv9odq0e19Do.ttf' },
      bold: { family: 'KodeMono-Bold', source: 'https://fonts.gstatic.com/s/kodemono/v4/A2BLn5pb0QgtVEPFnlYkkaoBgw4qv9odq3619Do.ttf' },
    },
    monospace: {
      thin: { family: 'RobotoMono-Thin', source: 'https://fonts.gstatic.com/s/robotomono/v31/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vuPQw.ttf' },
      extralight: { family: 'RobotoMono-ExtraLight', source: 'https://fonts.gstatic.com/s/robotomono/v31/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_XvqPQw.ttf' },
      light: { family: 'RobotoMono-Light', source: 'https://fonts.gstatic.com/s/robotomono/v31/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_gPqPQw.ttf' },
      regular: { family: 'RobotoMono-Regular', source: 'https://fonts.gstatic.com/s/robotomono/v31/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vqPQw.ttf' },
      medium: { family: 'RobotoMono-Medium', source: 'https://fonts.gstatic.com/s/robotomono/v31/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_7PqPQw.ttf' },
      semibold: { family: 'RobotoMono-SemiBold', source: 'https://fonts.gstatic.com/s/robotomono/v31/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_AP2PQw.ttf' },
      bold: { family: 'RobotoMono-Bold', source: 'https://fonts.gstatic.com/s/robotomono/v31/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_Of2PQw.ttf' },
    },
  },
  
  colors: {
    // Primary palette (matches web --primary-color: #EEC643)
    primary: '#EEC643',
    primaryAccent: '#f59e0b',
    primaryLight: '#fbbf24',
    primaryDark: '#d97706',
    
    // Secondary palette (matches web --secondary-color: #ffffff)
    secondary: '#ffffff',
    secondaryAccent: '#808080',
    
    // Tertiary palette (matches web --tertiary-color: #83C5BE)
    tertiary: '#83C5BE',
    tertiaryAccent: '#006D77',
    
    // Semantic colors
    success: '#10b981',
    warning: '#ffc107',
    error: '#B42F2D',
    info: '#0284C7',
    
    // Neutral colors (matches web surface colors - dark admin theme)
    background: '#141414',
    surface: '#333333',
    surfaceAccent: '#444444',
    card: '#333333',
    
    // Text colors (matches web --text-color: #96A2B0)
    text: '#96A2B0',
    textContrast: '#141414',
    
    // Border colors (matches web --border-color)
    border: '#dee2e6',
    borderLight: '#f8f9fa',
    
    // Overlay
    backdrop: 'rgba(73, 80, 87, 0.6)',
    overlay: 'rgba(73, 80, 87, 0.4)',
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
        light: 'Jura-Light',
        regular: 'Jura-Regular',
        medium: 'Jura-Medium',
        semibold: 'Jura-SemiBold',
        bold: 'Jura-Bold',
      },
      secondary: {
        regular: 'KodeMono-Regular',
        medium: 'KodeMono-Medium',
        semibold: 'KodeMono-SemiBold',
        bold: 'KodeMono-Bold',
      },
      monospace: {
        thin: 'RobotoMono-Thin',
        extralight: 'RobotoMono-ExtraLight',
        light: 'RobotoMono-Light',
        regular: 'RobotoMono-Regular',
        medium: 'RobotoMono-Medium',
        semibold: 'RobotoMono-SemiBold',
        bold: 'RobotoMono-Bold',
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
    sm: 2,      // checkbox-radius: 2px
    md: 4,      // border-radius/card-radius/input-radius/button-radius: 4px
    lg: 4,
    xl: 4,
    xxl: 28,    // fab-radius: 28px
    full: 9999,
  },
  
  shadows: {
    none: {},
    sm: Platform.select({
      ios: {
        shadowColor: '#1E40AF',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1.0,
      },
      android: {
        elevation: 2,
      },
    }),
    md: Platform.select({
      ios: {
        shadowColor: '#1E40AF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 2.22,
      },
      android: {
        elevation: 4,
      },
    }),
    lg: Platform.select({
      ios: {
        shadowColor: '#1E40AF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 8,
      },
    }),
    xl: Platform.select({
      ios: {
        shadowColor: '#1E40AF',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
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
    backgroundColor: '#141414',
  },
};
