import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Container - Flexible layout wrapper
 * 
 * @param {string} layout - column, row, wrap
 * @param {string|number} gap - Spacing between children
 * @param {string|number} padding - Inner padding (or object: { top, bottom, left, right, horizontal, vertical })
 * @param {string|number} margin - Outer margin (or object: { top, bottom, left, right, horizontal, vertical })
 * @param {string} align - flex-start, center, flex-end, stretch, baseline
 * @param {string} justify - flex-start, center, flex-end, space-between, space-around, space-evenly
 * @param {string} alignSelf - flex-start, center, flex-end, stretch (override parent alignment)
 * @param {string} background - Theme color key or custom color
 * @param {number|string} flex - Flex grow value
 * @param {number|string} width - Width (number, percentage string, or 'full')
 * @param {number|string} height - Height (number, percentage string, or 'full')
 * @param {number|string} minHeight - Minimum height
 * @param {number|string} maxWidth - Maximum width
 * @param {string} position - relative, absolute
 * @param {number} top/right/bottom/left - Position offsets (when position is absolute)
 * @param {string|number} borderRadius - Border radius
 * @param {boolean} center - Shorthand for align="center" justify="center"
 */
export const Container = ({
  children,
  layout = 'column',
  gap,
  padding,
  margin,
  align,
  justify,
  alignSelf,
  background,
  flex,
  width,
  height,
  minHeight,
  maxWidth,
  position,
  top,
  right,
  bottom,
  left,
  borderRadius,
  center = false,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const getSpacing = (value) => {
    if (value === undefined || value === null) return undefined;
    if (typeof value === 'number') return value;
    return theme.spacing[value] ?? value;
  };

  const getSpacingObject = (value) => {
    if (value === undefined || value === null) return {};
    if (typeof value === 'number' || typeof value === 'string') {
      const spacing = getSpacing(value);
      return spacing !== undefined ? { padding: spacing } : {};
    }
    // Object format: { top, bottom, left, right, horizontal, vertical }
    const result = {};
    if (value.top !== undefined) result.paddingTop = getSpacing(value.top);
    if (value.bottom !== undefined) result.paddingBottom = getSpacing(value.bottom);
    if (value.left !== undefined) result.paddingLeft = getSpacing(value.left);
    if (value.right !== undefined) result.paddingRight = getSpacing(value.right);
    if (value.horizontal !== undefined) {
      result.paddingHorizontal = getSpacing(value.horizontal);
    }
    if (value.vertical !== undefined) {
      result.paddingVertical = getSpacing(value.vertical);
    }
    return result;
  };

  const getMarginObject = (value) => {
    if (value === undefined || value === null) return {};
    if (typeof value === 'number' || typeof value === 'string') {
      const spacing = getSpacing(value);
      return spacing !== undefined ? { margin: spacing } : {};
    }
    const result = {};
    if (value.top !== undefined) result.marginTop = getSpacing(value.top);
    if (value.bottom !== undefined) result.marginBottom = getSpacing(value.bottom);
    if (value.left !== undefined) result.marginLeft = getSpacing(value.left);
    if (value.right !== undefined) result.marginRight = getSpacing(value.right);
    if (value.horizontal !== undefined) {
      result.marginHorizontal = getSpacing(value.horizontal);
    }
    if (value.vertical !== undefined) {
      result.marginVertical = getSpacing(value.vertical);
    }
    return result;
  };

  const getDimension = (value) => {
    if (value === undefined || value === null) return undefined;
    if (value === 'full') return '100%';
    return value;
  };

  const getBorderRadius = (value) => {
    if (value === undefined || value === null) return undefined;
    if (typeof value === 'number') return value;
    return theme.borderRadius[value] ?? value;
  };

  const backgroundColor = background 
    ? (theme.colors[background] || background)
    : undefined;

  // Determine alignment (center prop is shorthand)
  const alignItems = center ? 'center' : (align || 'stretch');
  const justifyContent = center ? 'center' : (justify || 'flex-start');

  return (
    <View
      style={[
        {
          flexDirection: layout === 'row' ? 'row' : 'column',
          flexWrap: layout === 'wrap' ? 'wrap' : 'nowrap',
          gap: getSpacing(gap),
          alignItems,
          justifyContent,
          alignSelf,
          backgroundColor,
          flex,
          width: getDimension(width),
          height: getDimension(height),
          minHeight: getDimension(minHeight),
          maxWidth: getDimension(maxWidth),
          position,
          top,
          right,
          bottom,
          left,
          borderRadius: getBorderRadius(borderRadius),
        },
        getSpacingObject(padding),
        getMarginObject(margin),
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};
