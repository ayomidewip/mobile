import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

/**
 * IconButton - Mobile-optimized button with icon
 * Changes appearance when pressed/selected
 * 
 * @param {string} icon - Ionicons icon name (e.g., 'home', 'settings', 'add')
 * @param {string} iconSelected - Icon name when selected (defaults to filled variant)
 * @param {boolean} selected - Whether button is in selected state
 * @param {string} color - Theme color key or custom color
 * @param {string} selectedColor - Color when selected
 * @param {string} size - xs, sm, md, lg, xl or number
 * @param {string} label - Optional text label below the icon
 * @param {boolean} disabled - Disabled state
 * @param {boolean} loading - Show loading spinner
 * @param {function} onPress - Press handler
 */
export const IconButton = ({
  icon,
  iconSelected,
  selected = false,
  color,
  selectedColor,
  size = 'md',
  label,
  disabled = false,
  loading = false,
  onPress,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const fonts = theme.typography.fonts || {};
  const weights = theme.typography.fontWeight || {};
  const primaryFont = fonts.primary?.medium || fonts.primary?.regular || 'System';
  const primaryWeight = weights.medium || '500';

  const sizes = {
    xs: { icon: 16, padding: theme.spacing.xs, label: 8 },
    sm: { icon: 20, padding: theme.spacing.sm, label: 10 },
    md: { icon: 24, padding: theme.spacing.md, label: 11 },
    lg: { icon: 28, padding: theme.spacing.lg, label: 12 },
    xl: { icon: 32, padding: theme.spacing.xl, label: 14 },
  };

  const sizeConfig = typeof size === 'number' 
    ? { icon: size, padding: theme.spacing.md, label: 11 }
    : sizes[size];

  // Determine icon name - use outline/filled pattern
  const getIconName = () => {
    if (selected && iconSelected) return iconSelected;
    if (selected) {
      // Try to use filled variant
      return icon.endsWith('-outline') ? icon.replace('-outline', '') : icon;
    }
    // Use outline variant for unselected
    return icon.includes('-outline') ? icon : `${icon}-outline`;
  };

  // Determine colors
  const baseColor = color ? (theme.colors[color] || color) : theme.colors.textMuted;
  const activeColor = selectedColor ? (theme.colors[selectedColor] || selectedColor) : theme.colors.primary;
  const iconColor = selected ? activeColor : baseColor;

  if (loading) {
    return (
      <Pressable
        style={[
          styles.iconButton,
          { padding: sizeConfig.padding },
          disabled && styles.disabled,
          style,
        ]}
        disabled={true}
        {...props}
      >
        <ActivityIndicator size="small" color={iconColor} />
        {label && (
          <Text
            style={[
              styles.iconButtonLabel,
              {
                color: iconColor,
                fontSize: sizeConfig.label,
                fontFamily: primaryFont,
                fontWeight: primaryWeight,
              },
            ]}
          >
            {label}
          </Text>
        )}
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.iconButton,
        { padding: sizeConfig.padding },
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {({ pressed }) => {
        const currentColor = pressed ? activeColor : iconColor;
        return (
          <View style={styles.iconButtonContent}>
            <Ionicons
              name={getIconName()}
              size={sizeConfig.icon}
              color={currentColor}
            />
            {label && (
              <Text
                style={[
                  styles.iconButtonLabel,
                  {
                    color: currentColor,
                    fontSize: sizeConfig.label,
                    fontFamily: primaryFont,
                    fontWeight: primaryWeight,
                  },
                ]}
                numberOfLines={1}
              >
                {label}
              </Text>
            )}
          </View>
        );
      }}
    </Pressable>
  );
};

/**
 * Button - Standard button with text (for forms, CTAs)
 * 
 * @param {string} variant - filled, outline, ghost
 * @param {string} color - Theme color key
 * @param {string} size - sm, md, lg
 */
export const Button = ({
  children,
  variant = 'filled',
  color = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  onPress,
  style,
  textStyle,
  ...props
}) => {
  const { theme } = useTheme();
  const fonts = theme.typography.fonts || {};
  const weights = theme.typography.fontWeight || {};
  const primaryFont = fonts.primary?.semibold || fonts.primary?.regular || 'System';
  const semiboldWeight = weights.semibold || '600';

  const buttonColor = theme.colors[color] || color;

  const sizes = {
    sm: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      fontSize: theme.typography.fontSize.sm,
      iconSize: 16,
    },
    md: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      fontSize: theme.typography.fontSize.md,
      iconSize: 20,
    },
    lg: {
      paddingVertical: theme.spacing.lg,
      paddingHorizontal: theme.spacing.xl,
      fontSize: theme.typography.fontSize.lg,
      iconSize: 24,
    },
  };

  const sizeConfig = sizes[size];

  const variantStyles = {
    filled: {
      backgroundColor: buttonColor,
      borderWidth: 0,
      textColor: theme.colors.textContrast,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: buttonColor,
      textColor: buttonColor,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      textColor: buttonColor,
    },
  };

  const variantConfig = variantStyles[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.textButton,
        {
          backgroundColor: variantConfig.backgroundColor,
          borderWidth: variantConfig.borderWidth,
          borderColor: variantConfig.borderColor,
          paddingVertical: sizeConfig.paddingVertical,
          paddingHorizontal: sizeConfig.paddingHorizontal,
          borderRadius: theme.borderRadius.md,
          opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
        },
        fullWidth && styles.fullWidth,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variantConfig.textColor} />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Ionicons
              name={icon}
              size={sizeConfig.iconSize}
              color={variantConfig.textColor}
              style={{ marginRight: theme.spacing.sm }}
            />
          )}
          {typeof children === 'string' || typeof children === 'number' ? (
            <Text
              style={[
                {
                  color: variantConfig.textColor,
                  fontSize: sizeConfig.fontSize,
                  fontFamily: primaryFont,
                  fontWeight: semiboldWeight,
                },
                textStyle,
              ]}
            >
              {children}
            </Text>
          ) : (
            children
          )}
          {icon && iconPosition === 'right' && (
            <Ionicons
              name={icon}
              size={sizeConfig.iconSize}
              color={variantConfig.textColor}
              style={{ marginLeft: theme.spacing.sm }}
            />
          )}
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonLabel: {
    marginTop: 2,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.4,
  },
  textButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
});
