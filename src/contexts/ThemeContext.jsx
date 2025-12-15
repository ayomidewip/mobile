import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { modernTheme } from '../themes/modern';
import { darkTheme } from '../themes/dark';
import { minimalTheme } from '../themes/minimal';
import { vibrantTheme } from '../themes/vibrant';
import { adminTheme } from '../themes/admin';
import { pinkTheme } from '../themes/pink';

// Theme registry
const themes = {
  modern: modernTheme,
  dark: darkTheme,
  minimal: minimalTheme,
  vibrant: vibrantTheme,
  admin: adminTheme,
  pink: pinkTheme,
};

const themeNames = Object.keys(themes);

// Helper to convert hex to rgba with opacity
const hexToRgba = (hex, opacity) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Get theme with computed colors (textMuted derived from text)
const getTheme = (name) => {
  const baseTheme = themes[name] || themes.modern;
  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      // Compute textMuted as text color with 60% opacity
      textMuted: hexToRgba(baseTheme.colors.text, 0.6),
    },
  };
};

// Collect all unique fonts from all themes for expo-font loading
const collectFonts = () => {
  const fontMap = {};
  Object.values(themes).forEach((theme) => {
    if (theme.fonts) {
      Object.values(theme.fonts).forEach((fontGroup) => {
        // Handle structure with weight variants (thin, light, regular, bold, etc.)
        Object.values(fontGroup).forEach((weightDef) => {
          if (weightDef && weightDef.family && weightDef.source) {
            if (!fontMap[weightDef.family]) {
              fontMap[weightDef.family] = weightDef.source;
            }
          }
        });
      });
    }
  });
  return fontMap;
};

export const loadableFonts = collectFonts();

const THEME_STORAGE_KEY = '@app_theme';

const ThemeContext = createContext(undefined);

/**
 * Root ThemeProvider - manages global theme state and persistence
 */
export const ThemeProvider = ({ children, initialTheme = 'modern' }) => {
  const [themeName, setThemeName] = useState(initialTheme);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme on mount
  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY)
      .then((savedTheme) => {
        if (savedTheme && themes[savedTheme]) {
          setThemeName(savedTheme);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  // Switch theme - update state immediately, persist in background
  const switchTheme = (newTheme) => {
    if (!themes[newTheme]) return;
    setThemeName(newTheme);
    // Persist in background - don't await
    AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme).catch(() => {});
  };

  // Cycle through themes
  const cycleTheme = () => {
    const currentIndex = themeNames.indexOf(themeName);
    const nextIndex = (currentIndex + 1) % themeNames.length;
    switchTheme(themeNames[nextIndex]);
  };

  const theme = getTheme(themeName);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeName,
        themeNames,
        switchTheme,
        cycleTheme,
        isLoading,
        isDark: themeName === 'dark',
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * NestedThemeProvider - allows overriding theme for a subtree
 * Does NOT persist to storage, only affects children
 * 
 * Usage:
 *   <ThemeProvider>
 *     <Text>Uses global theme</Text>
 *     <NestedThemeProvider theme="dark">
 *       <Card>This card uses dark theme</Card>
 *     </NestedThemeProvider>
 *   </ThemeProvider>
 */
export const NestedThemeProvider = ({ children, theme: themeProp }) => {
  const parentContext = useContext(ThemeContext);
  
  if (!parentContext) {
    throw new Error('NestedThemeProvider must be used within a ThemeProvider');
  }

  // If themeProp is a string, get the theme object; otherwise use as-is (custom theme object)
  const nestedTheme = typeof themeProp === 'string' 
    ? getTheme(themeProp) 
    : themeProp;

  const value = {
    ...parentContext,
    theme: nestedTheme,
    themeName: typeof themeProp === 'string' ? themeProp : nestedTheme.name,
    isDark: (typeof themeProp === 'string' ? themeProp : nestedTheme.name) === 'dark',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * useTheme hook - access current theme from nearest provider
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeContext, themes, themeNames, getTheme };
