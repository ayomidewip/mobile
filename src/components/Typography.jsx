import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Typography component for consistent text styling
 * 
 * @param {string} variant - h1, h2, h3, h4, h5, h6, body, caption, overline, monospace
 * @param {string} font - primary, secondary, monospace (overrides variant default)
 * @param {string} color - Theme color key or custom color
 * @param {string} weight - thin, extralight, light, regular, medium, semibold, bold, extrabold, black
 * @param {string} align - left, center, right
 * @param {number} numberOfLines - Text truncation
 */
export const Typography = ({
  children,
  variant = 'body',
  font,
  color,
  weight,
  align = 'left',
  numberOfLines,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const fonts = theme.typography.fonts || {};

  // Helper to get font family name based on weight
  const getFontFamily = (fontDef, weightName) => {
    if (!fontDef) return 'System';
    if (typeof fontDef === 'string') return fontDef; // Legacy support
    
    // Try to get the exact weight
    if (fontDef[weightName]) return fontDef[weightName];
    
    // Fallback chain for missing weights
    const fallbackMap = {
      thin: ['extralight', 'light', 'regular'],
      extralight: ['light', 'regular', 'thin'],
      light: ['regular', 'extralight', 'thin'],
      regular: ['medium', 'light'],
      medium: ['regular', 'semibold'],
      semibold: ['bold', 'medium', 'regular'],
      bold: ['semibold', 'extrabold', 'medium'],
      extrabold: ['bold', 'black', 'semibold'],
      black: ['extrabold', 'bold'],
    };
    
    const fallbacks = fallbackMap[weightName] || [];
    for (const fb of fallbacks) {
      if (fontDef[fb]) return fontDef[fb];
    }
    
    return fontDef.regular || 'System';
  };

  // Default weight mapping for variants
  const variantWeightMap = {
    h1: 'bold',
    h2: 'bold',
    h3: 'semibold',
    h4: 'semibold',
    h5: 'medium',
    h6: 'medium',
    body: 'regular',
    caption: 'regular',
    overline: 'medium',
    monospace: 'regular',
  };

  // Font group mapping for variants
  const variantFontMap = {
    h1: 'primary',
    h2: 'primary',
    h3: 'primary',
    h4: 'primary',
    h5: 'primary',
    h6: 'primary',
    body: 'primary',
    caption: 'secondary',
    overline: 'secondary',
    monospace: 'monospace',
  };

  // Determine the weight to use
  const effectiveWeight = weight || variantWeightMap[variant] || 'regular';
  
  // Determine which font group to use
  const fontGroup = font || variantFontMap[variant] || 'primary';
  const fontDef = fonts[fontGroup] || fonts.primary;
  
  // Get the actual font family name
  const fontFamily = getFontFamily(fontDef, effectiveWeight);

  const variantStyles = {
    h1: {
      fontSize: theme.typography.fontSize.h1,
      lineHeight: theme.typography.fontSize.h1 * theme.typography.lineHeight.tight,
    },
    h2: {
      fontSize: theme.typography.fontSize.h2,
      lineHeight: theme.typography.fontSize.h2 * theme.typography.lineHeight.tight,
    },
    h3: {
      fontSize: theme.typography.fontSize.h3,
      lineHeight: theme.typography.fontSize.h3 * theme.typography.lineHeight.tight,
    },
    h4: {
      fontSize: theme.typography.fontSize.h4,
      lineHeight: theme.typography.fontSize.h4 * theme.typography.lineHeight.normal,
    },
    h5: {
      fontSize: theme.typography.fontSize.h5,
      lineHeight: theme.typography.fontSize.h5 * theme.typography.lineHeight.normal,
    },
    h6: {
      fontSize: theme.typography.fontSize.h6,
      lineHeight: theme.typography.fontSize.h6 * theme.typography.lineHeight.normal,
    },
    body: {
      fontSize: theme.typography.fontSize.md,
      lineHeight: theme.typography.fontSize.md * theme.typography.lineHeight.normal,
    },
    caption: {
      fontSize: theme.typography.fontSize.sm,
      lineHeight: theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
    },
    overline: {
      fontSize: theme.typography.fontSize.xs,
      letterSpacing: 1,
      textTransform: 'uppercase',
      lineHeight: theme.typography.fontSize.xs * theme.typography.lineHeight.normal,
    },
    monospace: {
      fontSize: theme.typography.fontSize.sm,
      lineHeight: theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
    },
  };

  // Determine text color
  const textColor = color 
    ? (theme.colors[color] || color) 
    : theme.colors.text;

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        variantStyles[variant],
        {
          color: textColor,
          fontFamily,
          textAlign: align,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
