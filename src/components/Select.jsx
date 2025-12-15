import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Modal,
  StyleSheet,
  Animated,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { Badge } from './Badge';

const SELECT_VALIDATION_STATES = new Set(['default', 'success', 'warning', 'error']);
const SELECT_COLOR_OPTIONS = ['primary', 'secondary', 'tertiary'];

const sanitizeValidationState = (state) => (SELECT_VALIDATION_STATES.has(state) ? state : 'default');

/**
 * Select - Dropdown selection component with search and multi-select support
 * 
 * @param {string} label - Input label
 * @param {string} placeholder - Placeholder text
 * @param {array} options - Array of { value, label, disabled } objects
 * @param {any} value - Selected value (single or array for multiSelect)
 * @param {function} onChange - Change handler (receives value directly)
 * @param {string} variant - default, outline, filled, underline
 * @param {string} color - primary, secondary, tertiary
 * @param {string} size - xs, sm, md, lg, xl
 * @param {boolean} multiSelect - Enable multi-select mode
 * @param {boolean} searchable - Enable search/filter functionality
 * @param {string} helpText - Helper or error message
 * @param {boolean} disabled - Disable the select
 * @param {boolean} required - Show required indicator (*) and validate selection
 * @param {function} onValidation - Validation callback (called when required and touched)
 * @param {string} width - Custom width
 * @param {string} marginTop - none, xs, sm, md, lg, xl or custom
 * @param {string} marginBottom - none, xs, sm, md, lg, xl or custom
 */
export const Select = ({
  label,
  placeholder = 'Select an option...',
  options = [],
  value,
  onChange,
  variant = 'outline',
  color = 'primary',
  size = 'md',
  multiSelect = false,
  searchable = true,
  helpText,
  disabled = false,
  required = false,
  onValidation = null,
  width = null,
  marginTop = null,
  marginBottom = null,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const fonts = theme.typography.fonts || {};
  const primaryFont = fonts.primary?.regular || 'System';
  const mediumFont = fonts.primary?.medium || primaryFont;

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [internalValidation, setInternalValidation] = useState({ isValid: true, message: '' });

  const dropdownAnim = useRef(new Animated.Value(0)).current;

  const effectiveColor = SELECT_COLOR_OPTIONS.includes(color) ? color : 'primary';

  // Badge color variants for multi-select
  const badgeVariants = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error'];

  // Normalize value for multi-select
  const normalizedValue = multiSelect
    ? (Array.isArray(value) ? value : (value ? [value] : []))
    : value;

  // Size configurations
  const sizeConfig = {
    xs: { fontSize: 12, padding: 8, iconSize: 14, labelSize: 10, badgeSize: 'sm' },
    sm: { fontSize: 14, padding: 10, iconSize: 16, labelSize: 12, badgeSize: 'sm' },
    md: { fontSize: 16, padding: 12, iconSize: 20, labelSize: 14, badgeSize: 'md' },
    lg: { fontSize: 18, padding: 14, iconSize: 22, labelSize: 16, badgeSize: 'md' },
    xl: { fontSize: 20, padding: 16, iconSize: 24, labelSize: 18, badgeSize: 'lg' },
  };
  const currentSize = sizeConfig[size] || sizeConfig.md;

  // Color mapping
  const colorMap = {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    tertiary: theme.colors.tertiary,
  };
  const activeColor = colorMap[effectiveColor] || theme.colors.primary;

  // Get badge variant by position
  const getBadgeVariant = (index) => badgeVariants[index % badgeVariants.length];

  // Filter options based on search term
  const filteredOptions = searchTerm
    ? options.filter(option => {
        const optionLabel = (option.label || option.value || '').toLowerCase();
        const optionValue = (option.value || '').toLowerCase();
        return optionLabel.includes(searchTerm.toLowerCase()) || optionValue.includes(searchTerm.toLowerCase());
      })
    : options;

  // Validation function - only runs when required prop is true
  const performValidation = (selectValue) => {
    if (!required || disabled) return { isValid: true, message: '' };

    const isEmpty = multiSelect
      ? (Array.isArray(selectValue) ? selectValue.length === 0 : !selectValue)
      : (!selectValue || selectValue === '');

    if (isEmpty) {
      const fieldLabel = label || 'Field';
      return { isValid: false, message: `${fieldLabel} is required` };
    }

    return { isValid: true, message: '' };
  };

  // Validate on value change - only when required prop is true
  useEffect(() => {
    if (isTouched && required) {
      const validation = performValidation(multiSelect ? normalizedValue : value);
      setInternalValidation(validation);
      if (onValidation) {
        onValidation(validation);
      }
    }
  }, [value, isTouched, required, multiSelect]);

  // Animate dropdown
  useEffect(() => {
    Animated.timing(dropdownAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  // Get effective validation state - only show validation states when required
  const getEffectiveState = () => {
    if (required && isTouched) {
      if (!internalValidation.isValid) return 'error';
      if (multiSelect) {
        return normalizedValue.length > 0 ? 'success' : 'default';
      }
      return value ? 'success' : 'default';
    }
    return 'default';
  };

  const effectiveState = getEffectiveState();

  // State colors
  const stateColors = {
    default: theme.colors.border,
    success: theme.colors.success,
    warning: theme.colors.warning,
    error: theme.colors.error,
  };
  const borderColor = effectiveState === 'default' && isOpen ? activeColor : stateColors[effectiveState];

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

  // Get display text
  const getDisplayText = () => {
    if (multiSelect) {
      if (normalizedValue.length === 0) return '';
      if (normalizedValue.length === 1) {
        const selectedOption = options.find(opt => opt.value === normalizedValue[0]);
        return selectedOption ? (selectedOption.label || selectedOption.value) : normalizedValue[0];
      }
      return `${normalizedValue.length} items selected`;
    }

    if (!value) return '';
    const selectedOption = options.find(opt => opt.value === value);
    return selectedOption ? (selectedOption.label || selectedOption.value) : value;
  };

  // Get effective help text - only show validation message when required
  const getEffectiveHelpText = () => {
    if (required && isTouched && internalValidation.message) {
      return internalValidation.message;
    }
    return helpText;
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    if (option.disabled) return;

    let newValue;
    if (multiSelect) {
      const currentValues = normalizedValue || [];
      if (currentValues.includes(option.value)) {
        newValue = currentValues.filter(v => v !== option.value);
      } else {
        newValue = [...currentValues, option.value];
      }
    } else {
      newValue = option.value;
      setIsOpen(false);
      setSearchTerm('');
    }

    if (onChange) {
      onChange(newValue);
    }

    if (!multiSelect) {
      setIsTouched(true);
    }
  };

  // Handle badge remove
  const handleBadgeRemove = (valueToRemove) => {
    if (disabled || !multiSelect) return;

    const newValue = normalizedValue.filter(v => v !== valueToRemove);
    if (onChange) {
      onChange(newValue);
    }
  };

  // Handle open/close
  const handlePress = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
    }
  };

  // Handle close
  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm('');
    setIsTouched(true);
  };

  const containerStyle = {
    width: width || undefined,
    marginTop: getMarginValue(marginTop),
    marginBottom: getMarginValue(marginBottom) ?? 16,
  };

  const effectiveHelpText = getEffectiveHelpText();
  const displayText = getDisplayText();

  // Check if option is selected
  const isSelected = (optionValue) => {
    if (multiSelect) {
      return normalizedValue.includes(optionValue);
    }
    return value === optionValue;
  };

  return (
    <View style={[styles.container, containerStyle, style]}>
      {/* Label */}
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: effectiveState === 'error' ? theme.colors.error : theme.colors.text,
              fontSize: currentSize.labelSize,
              fontFamily: mediumFont,
              marginBottom: theme.spacing.xs,
            },
          ]}
        >
          {label}
          {required && <Text style={{ color: theme.colors.error }}> *</Text>}
        </Text>
      )}

      {/* Select Button */}
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={[
          styles.selectButton,
          variantStyles[variant],
          {
            paddingHorizontal: currentSize.padding,
            paddingVertical: currentSize.padding,
            paddingRight: currentSize.padding + currentSize.iconSize + 8, // Space for absolute icon
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        {/* Multi-select badges */}
        {multiSelect && normalizedValue.length > 0 ? (
          <View style={styles.badgesContainer}>
            {normalizedValue.map((selectedValue, index) => {
              const selectedOption = options.find(opt => opt.value === selectedValue);
              const displayLabel = selectedOption ? (selectedOption.label || selectedOption.value) : selectedValue;

              return (
                <Pressable
                  key={selectedValue}
                  onPress={() => handleBadgeRemove(selectedValue)}
                >
                  <Badge color={getBadgeVariant(index)} size={currentSize.badgeSize}>
                    {displayLabel}
                    <Text style={{ color: theme.colors.textContrast, marginLeft: 4 }}>×</Text>
                  </Badge>
                </Pressable>
              );
            })}
          </View>
        ) : (
          <Text
            style={[
              styles.selectText,
              {
                color: displayText ? theme.colors.text : theme.colors.textMuted,
                fontSize: currentSize.fontSize,
                fontFamily: primaryFont,
              },
            ]}
            numberOfLines={1}
          >
            {displayText || placeholder}
          </Text>
        )}

        {/* Dropdown Icon - Positioned absolutely */}
        <View style={[styles.dropdownIconContainer, { right: currentSize.padding }]}>
          <Ionicons
            name={isOpen ? 'chevron-up' : 'chevron-down'}
            size={currentSize.iconSize}
            color={activeColor}
          />
        </View>
      </Pressable>

      {/* Help Text */}
      {effectiveHelpText && (
        <Text
          style={[
            styles.helpText,
            {
              color: effectiveState === 'error' ? theme.colors.error :
                     effectiveState === 'warning' ? theme.colors.warning :
                     effectiveState === 'success' ? theme.colors.success :
                     theme.colors.textMuted,
              fontSize: currentSize.labelSize,
              fontFamily: primaryFont,
            },
          ]}
        >
          {effectiveHelpText}
        </Text>
      )}

      {/* Dropdown Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        <Pressable style={styles.modalOverlay} onPress={handleClose}>
          <Pressable style={[styles.dropdownContainer, { backgroundColor: theme.colors.surface }]} onPress={() => {}}>
            {/* Header */}
            <View style={[styles.dropdownHeader, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.dropdownTitle, { color: theme.colors.text, fontFamily: mediumFont }]}>
                {label || 'Select'}
              </Text>
              <Pressable onPress={handleClose} hitSlop={8}>
                <Ionicons name="close" size={24} color={theme.colors.text} />
              </Pressable>
            </View>

            {/* Search Input */}
            {searchable && (
              <View style={[styles.searchContainer, { borderBottomColor: theme.colors.border }]}>
                <Ionicons name="search" size={20} color={theme.colors.textMuted} />
                <TextInput
                  style={[
                    styles.searchInput,
                    {
                      color: theme.colors.text,
                      fontFamily: primaryFont,
                      fontSize: currentSize.fontSize,
                    },
                  ]}
                  placeholder="Search..."
                  placeholderTextColor={theme.colors.textMuted}
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                  autoFocus
                />
                {searchTerm ? (
                  <Pressable onPress={() => setSearchTerm('')} hitSlop={8}>
                    <Ionicons name="close-circle" size={20} color={theme.colors.textMuted} />
                  </Pressable>
                ) : null}
              </View>
            )}

            {/* Options List */}
            <ScrollView style={styles.optionsList} keyboardShouldPersistTaps="handled">
              {filteredOptions.length === 0 ? (
                <Text style={[styles.noOptions, { color: theme.colors.textMuted, fontFamily: primaryFont }]}>
                  No options found
                </Text>
              ) : (
                filteredOptions.map((option, index) => {
                  const selected = isSelected(option.value);
                  const optionDisabled = option.disabled;

                  return (
                    <Pressable
                      key={option.value}
                      onPress={() => handleOptionSelect(option)}
                      disabled={optionDisabled}
                      style={[
                        styles.option,
                        {
                          backgroundColor: selected ? `${activeColor}15` : 'transparent',
                          opacity: optionDisabled ? 0.5 : 1,
                        },
                      ]}
                    >
                      {multiSelect ? (
                        <View style={styles.optionContent}>
                          <Badge
                            color={selected ? getBadgeVariant(normalizedValue.indexOf(option.value)) : 'secondary'}
                            size={currentSize.badgeSize}
                          >
                            {option.label || option.value}
                          </Badge>
                          {selected && (
                            <Ionicons name="checkmark" size={20} color={activeColor} />
                          )}
                        </View>
                      ) : (
                        <View style={styles.optionContent}>
                          <Text
                            style={[
                              styles.optionText,
                              {
                                color: selected ? activeColor : theme.colors.text,
                                fontFamily: selected ? mediumFont : primaryFont,
                                fontSize: currentSize.fontSize,
                              },
                            ]}
                          >
                            {option.label || option.value}
                          </Text>
                          {selected && (
                            <Ionicons name="checkmark" size={20} color={activeColor} />
                          )}
                        </View>
                      )}
                    </Pressable>
                  );
                })
              )}
            </ScrollView>

            {/* Done button for multi-select */}
            {multiSelect && (
              <View style={[styles.dropdownFooter, { borderTopColor: theme.colors.border }]}>
                <Pressable
                  onPress={handleClose}
                  style={[styles.doneButton, { backgroundColor: activeColor }]}
                >
                  <Text style={[styles.doneButtonText, { fontFamily: mediumFont }]}>
                    Done ({normalizedValue.length} selected)
                  </Text>
                </Pressable>
              </View>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: 4,
  },
  selectButton: {
    position: 'relative',
    minHeight: 44,
  },
  selectText: {
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  badgeWrapper: {
  },
  dropdownIconContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  helpText: {
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dropdownContainer: {
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    padding: 0,
  },
  optionsList: {
    maxHeight: 300,
  },
  option: {
    padding: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    flex: 1,
  },
  noOptions: {
    padding: 20,
    textAlign: 'center',
  },
  dropdownFooter: {
    padding: 16,
    borderTopWidth: 1,
  },
  doneButton: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Select;
