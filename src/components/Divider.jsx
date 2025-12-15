import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Divider - Horizontal or vertical line
 * 
 * @param {string} direction - horizontal, vertical
 * @param {string} color - Theme color key or custom color
 * @param {number} thickness - Line thickness in pixels
 * @param {string|number} spacing - Margin around the divider
 */
export const Divider = ({
  direction = 'horizontal',
  color,
  thickness = 1,
  spacing = 'md',
  style,
}) => {
  const { theme } = useTheme();

  const getSpacing = (value) => {
    if (typeof value === 'number') return value;
    return theme.spacing[value] || 0;
  };

  const dividerColor = color 
    ? (theme.colors[color] || color)
    : theme.colors.border;

  const spacingValue = getSpacing(spacing);

  return (
    <View
      style={[
        {
          backgroundColor: dividerColor,
        },
        direction === 'horizontal'
          ? {
              height: thickness,
              width: '100%',
              marginVertical: spacingValue,
            }
          : {
              width: thickness,
              height: '100%',
              marginHorizontal: spacingValue,
            },
        style,
      ]}
    />
  );
};
