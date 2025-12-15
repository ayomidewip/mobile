import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Badge - Small status indicator
 * 
 * @param {string} variant - filled, outline, dot
 * @param {string} color - Theme color key
 * @param {string} size - sm, md, lg
 */
export const Badge = ({
  children,
  variant = 'filled',
  color = 'primary',
  size = 'md',
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const fonts = theme.typography.fonts || {};
  const weights = theme.typography.fontWeight || {};
  const primaryFont = fonts.primary?.semibold || fonts.primary?.regular || 'System';
  const semiboldWeight = weights.semibold || '600';

  const badgeColor = theme.colors[color] || color;

  const sizes = {
    sm: { paddingH: 6, paddingV: 2, fontSize: 10 },
    md: { paddingH: 8, paddingV: 3, fontSize: 12 },
    lg: { paddingH: 10, paddingV: 4, fontSize: 14 },
  };

  const sizeConfig = sizes[size];

  if (variant === 'dot') {
    return (
      <View
        style={[
          styles.dot,
          {
            backgroundColor: badgeColor,
            width: size === 'sm' ? 6 : size === 'md' ? 8 : 10,
            height: size === 'sm' ? 6 : size === 'md' ? 8 : 10,
          },
          style,
        ]}
        {...props}
      />
    );
  }

  const variantStyles = {
    filled: {
      backgroundColor: badgeColor,
      textColor: theme.colors.textContrast,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: badgeColor,
      textColor: badgeColor,
    },
  };

  const variantConfig = variantStyles[variant];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: variantConfig.backgroundColor,
          borderWidth: variantConfig.borderWidth,
          borderColor: variantConfig.borderColor,
          paddingHorizontal: sizeConfig.paddingH,
          paddingVertical: sizeConfig.paddingV,
          borderRadius: theme.borderRadius.full,
        },
        style,
      ]}
      {...props}
    >
      <Text
        style={[
          styles.text,
          {
            color: variantConfig.textColor,
            fontSize: sizeConfig.fontSize,
            fontFamily: primaryFont,
            fontWeight: semiboldWeight,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
};

/**
 * NotificationBadge - Badge positioned on another element
 */
export const NotificationBadge = ({
  children,
  count,
  showZero = false,
  max = 99,
  color = 'error',
  position = 'top-right',
  style,
}) => {
  const { theme } = useTheme();
  const fonts = theme.typography.fonts || {};
  const weights = theme.typography.fontWeight || {};
  const primaryFont = fonts.primary?.bold || fonts.primary?.regular || 'System';
  const boldWeight = weights.bold || '700';

  const shouldShow = showZero ? count >= 0 : count > 0;
  const displayCount = count > max ? `${max}+` : count;

  const positions = {
    'top-right': { top: -4, right: -4 },
    'top-left': { top: -4, left: -4 },
    'bottom-right': { bottom: -4, right: -4 },
    'bottom-left': { bottom: -4, left: -4 },
  };

  return (
    <View style={[styles.notificationContainer, style]}>
      {children}
      {shouldShow && (
        <View
          style={[
            styles.notificationBadge,
            {
              backgroundColor: theme.colors[color] || color,
              ...positions[position],
            },
          ]}
        >
          <Text
            style={[
              styles.notificationText,
              {
                fontFamily: primaryFont,
                fontWeight: boldWeight,
              },
            ]}
          >
            {displayCount}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
  },
  text: {
  },
  dot: {
    borderRadius: 999,
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  notificationText: {
    color: '#FFFFFF',
    fontSize: 10,
  },
});
