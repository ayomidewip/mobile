import React, { useState, useEffect, useRef } from 'react';
import { TextInput, View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

const INPUT_VALIDATION_STATES = new Set(['default', 'success', 'warning', 'error']);
const INPUT_COLOR_OPTIONS = ['primary', 'secondary', 'tertiary'];

const sanitizeValidationState = (state) => (INPUT_VALIDATION_STATES.has(state) ? state : 'default');

/**
 * Input - Text input with label and validation states
 * 
 * @param {string} label - Input label
 * @param {string} placeholder - Placeholder text
 * @param {string} value - Controlled value
 * @param {function} onChangeText - Change handler
 * @param {string} variant - default, outline, filled, underline, floating
 * @param {string} color - primary, secondary, tertiary
 * @param {string} size - xs, sm, md, lg, xl
 * @param {string} validationState - default, success, warning, error
 * @param {string} helpText - Helper or error message
 * @param {boolean} secureTextEntry - Password input
 * @param {string} icon - Ionicons icon name
 * @param {string} iconPosition - left, right
 * @param {boolean} required - Show required indicator and validate
 * @param {boolean} validate - Enable validation
 * @param {number} minLength - Minimum length validation
 * @param {number} maxLength - Maximum length validation
 * @param {function} onValidation - Validation callback
 * @param {string} confirmField - Value to match against (for password confirmation)
 * @param {string} type - text, email, password
 * @param {string} width - Custom width
 * @param {string} marginTop - none, xs, sm, md, lg, xl or custom
 * @param {string} marginBottom - none, xs, sm, md, lg, xl or custom
 */
export const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  variant = 'outline',
  color = 'primary',
  size = 'md',
  validationState = 'default',
  helpText,
  disabled = false,
  secureTextEntry = false,
  icon,
  iconPosition = 'left',
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  // New props
  required = false,
  validate = false,
  minLength = null,
  maxLength = null,
  onValidation = null,
  confirmField = null,
  type = 'text',
  width = null,
  marginTop = null,
  marginBottom = null,
  style,
  inputStyle,
  ...props
}) => {
  const { theme } = useTheme();
  const fonts = theme.typography.fonts || {};
  const weights = theme.typography.fontWeight || {};
  const primaryFont = fonts.primary?.regular || 'System';
  const secondaryFont = fonts.secondary?.regular || primaryFont;
  const mediumFont = fonts.primary?.medium || primaryFont;
  
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [isTouched, setIsTouched] = useState(false);
  const [internalValidation, setInternalValidation] = useState({ isValid: true, message: '' });
  
  // Animation for floating label
  const floatingAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  const effectiveColor = INPUT_COLOR_OPTIONS.includes(color) ? color : 'primary';
  const sanitizedValidationState = sanitizeValidationState(validationState);
  const shouldValidate = required || validate || type === 'email';

  // Size configurations
  const sizeConfig = {
    xs: { fontSize: 12, padding: 8, iconSize: 14, labelSize: 10 },
    sm: { fontSize: 14, padding: 10, iconSize: 16, labelSize: 12 },
    md: { fontSize: 16, padding: 12, iconSize: 20, labelSize: 14 },
    lg: { fontSize: 18, padding: 14, iconSize: 22, labelSize: 16 },
    xl: { fontSize: 20, padding: 16, iconSize: 24, labelSize: 18 },
  };
  const currentSize = sizeConfig[size] || sizeConfig.md;

  // Color mapping
  const colorMap = {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    tertiary: theme.colors.tertiary,
  };
  const activeColor = colorMap[effectiveColor] || theme.colors.primary;

  // Validation function
  const validateField = (val) => {
    const fieldLabel = label || 'Field';

    if (!val) {
      if (required) return { isValid: false, message: `${fieldLabel} is required` };
      return { isValid: true, message: '' };
    }

    if (type === 'email' && val) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        return { isValid: false, message: `${fieldLabel} must be a valid email address` };
      }
    }

    if (minLength && val.length < minLength) {
      return { isValid: false, message: `${fieldLabel} must be at least ${minLength} characters` };
    }

    if (maxLength && val.length > maxLength) {
      return { isValid: false, message: `${fieldLabel} cannot exceed ${maxLength} characters` };
    }

    if (confirmField !== null && confirmField !== val) {
      return { isValid: false, message: 'Passwords do not match' };
    }

    return { isValid: true, message: '' };
  };

  // Validate on value change
  useEffect(() => {
    if (isTouched && shouldValidate) {
      const validation = validateField(value);
      setInternalValidation(validation);
      if (onValidation) {
        onValidation(validation);
      }
    }
  }, [value, isTouched, shouldValidate, confirmField]);

  // Animate floating label
  useEffect(() => {
    if (variant === 'floating') {
      Animated.timing(floatingAnim, {
        toValue: isFocused || value ? 1 : 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  }, [isFocused, value, variant]);

  // Get effective validation state
  const getEffectiveState = () => {
    if (shouldValidate && isTouched) {
      return internalValidation.isValid ? (value ? 'success' : 'default') : 'error';
    }
    return sanitizedValidationState;
  };

  const effectiveState = getEffectiveState();

  // State colors
  const stateColors = {
    default: isFocused ? activeColor : theme.colors.border,
    success: theme.colors.success,
    warning: theme.colors.warning,
    error: theme.colors.error,
  };
  const borderColor = stateColors[effectiveState];

  // Variant styles
  const variantStyles = {
    default: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor,
      borderRadius: theme.borderRadius.md,
    },
    outline: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor,
      borderRadius: theme.borderRadius.md,
    },
    filled: {
      backgroundColor: theme.colors.surfaceAccent,
      borderWidth: 0,
      borderRadius: theme.borderRadius.md,
    },
    underline: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderBottomWidth: 1,
      borderColor,
      borderRadius: 0,
    },
    floating: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor,
      borderRadius: theme.borderRadius.md,
    },
  };

  // Margin helper
  const getMarginValue = (margin) => {
    if (margin === null) return undefined;
    if (margin === 'none') return 0;
    const spacingMap = {
      xs: theme.spacing.xs,
      sm: theme.spacing.sm,
      md: theme.spacing.md,
      lg: theme.spacing.lg,
      xl: theme.spacing.xl,
    };
    return spacingMap[margin] || margin;
  };

  // Get help text
  const getEffectiveHelpText = () => {
    if (shouldValidate && isTouched && internalValidation.message) {
      return internalValidation.message;
    }
    return helpText;
  };

  const handleFocus = () => {
    setIsFocused(true);
    props.onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsTouched(true);
    
    if (shouldValidate) {
      const validation = validateField(value);
      setInternalValidation(validation);
      if (onValidation) {
        onValidation(validation);
      }
    }
    props.onBlur?.();
  };

  // Floating label interpolations
  // When unfocused: position label so it appears vertically centered within the input
  // The input has paddingVertical, so the text vertical center is at: padding + fontSize/2
  // The label (absolute positioned) should have its center at the same point
  // Since the label font starts at fontSize, position it at: padding (so top of label text is at padding, center is at padding + fontSize/2)
  const unfocusedLabelTop = currentSize.padding;
  // When floated: move above the border - position so center of small label is at the border
  const floatedPosition = -currentSize.labelSize / 2;
  
  const labelTop = floatingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [unfocusedLabelTop, floatedPosition],
  });

  const labelFontSize = floatingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [currentSize.fontSize, currentSize.labelSize],
  });

  // Get label color based on validation state
  const getLabelColor = () => {
    if (effectiveState === 'error') return theme.colors.error;
    if (effectiveState === 'warning') return theme.colors.warning;
    if (effectiveState === 'success') return theme.colors.success;
    if (isFocused) return activeColor;
    return theme.colors.text;
  };

  const labelColorValue = getLabelColor();
  
  const labelColor = floatingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.textMuted, labelColorValue],
  });

  const containerStyle = {
    width: width || undefined,
    marginTop: getMarginValue(marginTop) ?? (variant === 'floating' ? currentSize.labelSize / 2 + 4 : undefined),
    marginBottom: getMarginValue(marginBottom) ?? 16,
  };

  const effectiveHelpText = getEffectiveHelpText();

  // Floating label variant
  if (variant === 'floating') {
    return (
      <View style={[styles.container, containerStyle, style]}>
        <View style={[styles.inputWrapper, variantStyles.floating, { paddingHorizontal: currentSize.padding, overflow: 'visible' }]}>
          {icon && iconPosition === 'left' && (
            <Ionicons
              name={icon}
              size={currentSize.iconSize}
              color={theme.colors.textMuted}
              style={styles.iconLeft}
            />
          )}
          
          <View style={styles.floatingInputContainer}>
            <Animated.Text
              style={[
                styles.floatingLabel,
                {
                  top: labelTop,
                  fontSize: labelFontSize,
                  color: labelColor,
                  backgroundColor: theme.colors.surface,
                  paddingHorizontal: 4,
                  fontFamily: primaryFont,
                },
              ]}
              pointerEvents="none"
            >
              {label}
              {required && <Text style={{ color: theme.colors.error }}> *</Text>}
            </Animated.Text>
            
            <TextInput
              value={value}
              onChangeText={onChangeText}
              placeholder={isFocused ? placeholder : ''}
              placeholderTextColor={theme.colors.textMuted}
              editable={!disabled}
              secureTextEntry={isSecure}
              multiline={multiline}
              numberOfLines={numberOfLines}
              keyboardType={type === 'email' ? 'email-address' : keyboardType}
              autoCapitalize={type === 'email' ? 'none' : autoCapitalize}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={[
                styles.input,
                {
                  color: theme.colors.text,
                  fontSize: currentSize.fontSize,
                  fontFamily: primaryFont,
                  paddingVertical: currentSize.padding,
                  minHeight: multiline ? numberOfLines * 24 : undefined,
                },
                disabled && styles.disabled,
                inputStyle,
              ]}
              {...props}
            />
          </View>
          
          {secureTextEntry && (
            <Pressable onPress={() => setIsSecure(!isSecure)} style={styles.iconRight}>
              <Ionicons
                name={isSecure ? 'eye-outline' : 'eye-off-outline'}
                size={currentSize.iconSize}
                color={theme.colors.textMuted}
              />
            </Pressable>
          )}
          
          {icon && iconPosition === 'right' && !secureTextEntry && (
            <Ionicons
              name={icon}
              size={currentSize.iconSize}
              color={theme.colors.textMuted}
              style={styles.iconRight}
            />
          )}
        </View>
        
        {effectiveHelpText && (
          <Text
            style={[
              styles.helpText,
              {
                color: effectiveState === 'error'
                  ? theme.colors.error
                  : effectiveState === 'warning'
                  ? theme.colors.warning
                  : effectiveState === 'success'
                  ? theme.colors.success
                  : theme.colors.textMuted,
                fontFamily: secondaryFont,
                fontSize: currentSize.labelSize,
              },
            ]}
          >
            {effectiveHelpText}
          </Text>
        )}
      </View>
    );
  }

  // Standard variants (default, outline, filled, underline)
  return (
    <View style={[styles.container, containerStyle, style]}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: getLabelColor(),
              fontFamily: mediumFont,
              fontSize: currentSize.labelSize,
            },
          ]}
        >
          {label}
          {required && <Text style={{ color: theme.colors.error }}> *</Text>}
        </Text>
      )}
      
      <View style={[styles.inputWrapper, variantStyles[variant] || variantStyles.outline, { paddingHorizontal: currentSize.padding }]}>
        {icon && iconPosition === 'left' && (
          <Ionicons
            name={icon}
            size={currentSize.iconSize}
            color={theme.colors.textMuted}
            style={styles.iconLeft}
          />
        )}
        
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textMuted}
          editable={!disabled}
          secureTextEntry={isSecure}
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={type === 'email' ? 'email-address' : keyboardType}
          autoCapitalize={type === 'email' ? 'none' : autoCapitalize}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[
            styles.input,
            {
              color: theme.colors.text,
              fontSize: currentSize.fontSize,
              fontFamily: primaryFont,
              paddingVertical: currentSize.padding,
              minHeight: multiline ? numberOfLines * 24 : undefined,
            },
            disabled && styles.disabled,
            inputStyle,
          ]}
          {...props}
        />
        
        {secureTextEntry && (
          <Pressable onPress={() => setIsSecure(!isSecure)} style={styles.iconRight}>
            <Ionicons
              name={isSecure ? 'eye-outline' : 'eye-off-outline'}
              size={currentSize.iconSize}
              color={theme.colors.textMuted}
            />
          </Pressable>
        )}
        
        {icon && iconPosition === 'right' && !secureTextEntry && (
          <Ionicons
            name={icon}
            size={currentSize.iconSize}
            color={theme.colors.textMuted}
            style={styles.iconRight}
          />
        )}
      </View>
      
      {effectiveHelpText && (
        <Text
          style={[
            styles.helpText,
            {
              color: effectiveState === 'error'
                ? theme.colors.error
                : effectiveState === 'warning'
                ? theme.colors.warning
                : effectiveState === 'success'
                ? theme.colors.success
                : theme.colors.textMuted,
              fontFamily: secondaryFont,
              fontSize: currentSize.labelSize,
            },
          ]}
        >
          {effectiveHelpText}
        </Text>
      )}
    </View>
  );
};

/**
 * SearchInput - Specialized search input
 */
export const SearchInput = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  onSubmit,
  size = 'md',
  color = 'primary',
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const fonts = theme.typography.fonts || {};
  const primaryFont = fonts.primary?.regular || 'System';

  const effectiveColor = INPUT_COLOR_OPTIONS.includes(color) ? color : 'primary';
  const colorMap = {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    tertiary: theme.colors.tertiary,
  };

  const sizeConfig = {
    xs: { fontSize: 12, padding: 6, iconSize: 14 },
    sm: { fontSize: 14, padding: 8, iconSize: 16 },
    md: { fontSize: 16, padding: 10, iconSize: 20 },
    lg: { fontSize: 18, padding: 12, iconSize: 22 },
    xl: { fontSize: 20, padding: 14, iconSize: 24 },
  };
  const currentSize = sizeConfig[size] || sizeConfig.md;

  return (
    <View
      style={[
        styles.searchWrapper,
        {
          backgroundColor: theme.colors.surfaceAccent,
          borderRadius: theme.borderRadius.full,
          paddingHorizontal: currentSize.padding + 6,
        },
        style,
      ]}
    >
      <Ionicons
        name="search-outline"
        size={currentSize.iconSize}
        color={theme.colors.textMuted}
        style={styles.searchIcon}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        style={[
          styles.searchInput,
          {
            color: theme.colors.text,
            fontSize: currentSize.fontSize,
            fontFamily: primaryFont,
            paddingVertical: currentSize.padding,
          },
        ]}
        {...props}
      />
      {value?.length > 0 && (
        <Pressable onPress={() => onChangeText('')} style={styles.clearButton}>
          <Ionicons
            name="close-circle"
            size={currentSize.iconSize}
            color={theme.colors.textMuted}
          />
        </Pressable>
      )}
    </View>
  );
};

/**
 * Checkbox - Checkbox input with label
 */
export const Checkbox = ({
  checked = false,
  onChange,
  label,
  color = 'primary',
  size = 'md',
  disabled = false,
  indeterminate = false,
  helpText,
  required = false,
  style,
}) => {
  const { theme } = useTheme();
  const fonts = theme.typography.fonts || {};
  const primaryFont = fonts.primary?.regular || 'System';

  const effectiveColor = INPUT_COLOR_OPTIONS.includes(color) ? color : 'primary';
  const colorMap = {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    tertiary: theme.colors.tertiary,
  };
  const activeColor = colorMap[effectiveColor] || theme.colors.primary;

  const sizeConfig = {
    xs: { box: 16, icon: 12, fontSize: 12 },
    sm: { box: 20, icon: 14, fontSize: 14 },
    md: { box: 24, icon: 18, fontSize: 16 },
    lg: { box: 28, icon: 20, fontSize: 18 },
    xl: { box: 32, icon: 24, fontSize: 20 },
  };
  const currentSize = sizeConfig[size] || sizeConfig.md;

  const iconName = indeterminate ? 'remove' : 'checkmark';

  return (
    <View style={[styles.checkboxContainer, style]}>
      <Pressable
        onPress={() => !disabled && onChange?.(!checked)}
        style={[
          styles.checkbox,
          {
            width: currentSize.box,
            height: currentSize.box,
            borderRadius: theme.borderRadius.sm,
            borderColor: checked || indeterminate ? activeColor : theme.colors.border,
            backgroundColor: checked || indeterminate ? activeColor : 'transparent',
          },
          disabled && styles.disabled,
        ]}
        disabled={disabled}
      >
        {(checked || indeterminate) && (
          <Ionicons
            name={iconName}
            size={currentSize.icon}
            color={theme.colors.textContrast}
          />
        )}
      </Pressable>
      
      {label && (
        <Pressable onPress={() => !disabled && onChange?.(!checked)} disabled={disabled}>
          <Text
            style={[
              styles.checkboxLabel,
              {
                color: disabled ? theme.colors.textMuted : theme.colors.text,
                fontFamily: primaryFont,
                fontSize: currentSize.fontSize,
              },
            ]}
          >
            {label}
            {required && <Text style={{ color: theme.colors.error }}> *</Text>}
          </Text>
        </Pressable>
      )}
      
      {helpText && (
        <Text
          style={[
            styles.checkboxHelpText,
            {
              color: theme.colors.textMuted,
              fontFamily: primaryFont,
              fontSize: currentSize.fontSize - 2,
              marginLeft: currentSize.box + 12,
            },
          ]}
        >
          {helpText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    overflow: 'visible',
  },
  label: {
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  disabled: {
    opacity: 0.5,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  helpText: {
    marginTop: 4,
  },
  // Floating label styles
  floatingInputContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'visible',
  },
  floatingLabel: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
    overflow: 'visible',
  },
  // Search styles
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
  },
  clearButton: {
    marginLeft: 8,
  },
  // Checkbox styles
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  checkbox: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 12,
  },
  checkboxHelpText: {
    width: '100%',
    marginTop: 4,
  },
});
