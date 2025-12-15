import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Switch - Toggle switch with optional label
 */
export const Switch = ({
  value,
  onValueChange,
  label,
  labelPosition = 'left',
  color,
  disabled = false,
  style,
}) => {
  const { theme } = useTheme();
  const primaryFont = theme.typography?.fonts?.primary?.regular || 'System';

  const activeColor = color ? (theme.colors[color] || color) : theme.colors.primary;
  const inactiveColor = theme.colors.secondary;

  const handlePress = () => !disabled && onValueChange?.(!value);

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[styles.container, disabled && styles.disabled, style]}
    >
      {label && labelPosition === 'left' && (
        <Text style={[styles.label, { color: theme.colors.text, marginRight: theme.spacing.md, fontFamily: primaryFont }]}>
          {label}
        </Text>
      )}

      <View style={[styles.track, { backgroundColor: value ? activeColor : inactiveColor }]}>
        <View style={[styles.thumb, { backgroundColor: theme.colors.surface, transform: [{ translateX: value ? 22 : 2 }] }]} />
      </View>

      {label && labelPosition === 'right' && (
        <Text style={[styles.label, { color: theme.colors.text, marginLeft: theme.spacing.md, fontFamily: primaryFont }]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

/**
 * Checkbox - Checkbox with optional label
 */
export const Checkbox = ({
  checked,
  onPress,
  label,
  color,
  disabled = false,
  style,
}) => {
  const { theme } = useTheme();
  const primaryFont = theme.typography?.fonts?.primary?.regular || 'System';

  const activeColor = color ? (theme.colors[color] || color) : theme.colors.primary;

  return (
    <Pressable
      onPress={() => !disabled && onPress?.(!checked)}
      disabled={disabled}
      style={[styles.container, disabled && styles.disabled, style]}
    >
      <View
        style={[
          styles.checkbox,
          {
            borderColor: checked ? activeColor : theme.colors.secondary,
            backgroundColor: checked ? activeColor : 'transparent',
          },
        ]}
      >
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>

      {label && (
        <Text style={[styles.label, { color: theme.colors.text, marginLeft: theme.spacing.sm, fontFamily: primaryFont }]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  track: {
    width: 48,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
  },
});
