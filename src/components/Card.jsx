import React from 'react';
import { View, Pressable } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Card - Elevated container with background and optional layout
 * 
 * @param {string} variant - elevated, outlined, filled
 * @param {string} layout - column, row, wrap (default: column)
 * @param {string|number} padding - Inner padding
 * @param {string|number} gap - Spacing between children
 * @param {string} align - flex-start, center, flex-end, stretch
 * @param {string} justify - flex-start, center, flex-end, space-between, space-around
 * @param {string} shadow - none, sm, md, lg, xl
 * @param {string} borderRadius - Theme border radius key or number
 * @param {number|string} width - Width (number, percentage, or 'full')
 * @param {number|string} height - Height
 * @param {number} flex - Flex value
 * @param {function} onPress - Press handler (makes card pressable)
 */
export const Card = ({
  children,
  variant = 'elevated',
  layout = 'column',
  padding = 'lg',
  gap,
  align = 'stretch',
  justify = 'flex-start',
  shadow = 'md',
  borderRadius = 'lg',
  width,
  height,
  flex,
  onPress,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const getSpacing = (value) => {
    if (value === undefined || value === null) return undefined;
    if (typeof value === 'number') return value;
    return theme.spacing[value] ?? value;
  };

  const getBorderRadius = (value) => {
    if (typeof value === 'number') return value;
    return theme.borderRadius[value] || 0;
  };

  const getDimension = (value) => {
    if (value === undefined || value === null) return undefined;
    if (value === 'full') return '100%';
    return value;
  };

  const variantStyles = {
    elevated: {
      backgroundColor: theme.colors.card,
      borderWidth: 0,
      ...(shadow !== 'none' && theme.shadows?.[shadow]),
    },
    outlined: {
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    filled: {
      backgroundColor: theme.colors.surfaceAccent,
      borderWidth: 0,
    },
  };

  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper
      onPress={onPress}
      style={[
        {
          flexDirection: layout === 'row' ? 'row' : 'column',
          flexWrap: layout === 'wrap' ? 'wrap' : 'nowrap',
          padding: getSpacing(padding),
          gap: getSpacing(gap),
          alignItems: align,
          justifyContent: justify,
          borderRadius: getBorderRadius(borderRadius),
          overflow: 'hidden',
          width: getDimension(width),
          height: getDimension(height),
          flex,
        },
        variantStyles[variant],
        style,
      ]}
      {...props}
    >
      {children}
    </Wrapper>
  );
};
