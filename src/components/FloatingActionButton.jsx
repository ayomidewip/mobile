import React, { useRef, useState, useEffect, forwardRef } from 'react';
import { View, Pressable, StyleSheet, Animated, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { Badge } from './Badge';

/**
 * FloatingActionButton - Enhanced floating action button with complete positional awareness
 * Based on Button component but with absolute/fixed positioning and parent container awareness
 *
 * Key Features:
 * - Complete positional awareness with 9 position variants
 * - Icon-based design with Ionicons
 * - Optional badge support with auto-positioning
 * - Multiple size variants
 * - Theme inheritance support
 * - Accessibility support
 * - Smooth animations
 * - Press feedback
 *
 * Positioning System:
 * - Positions relative to parent container bounds (use within Container/Card/View with relative positioning)
 * - Supports 9 position variants: corners, edges, and center
 * - Optional drag and drop repositioning within parent container
 * - Edge snapping with smooth animations
 */
export const FloatingActionButton = forwardRef(({
  // Button variant: 'primary', 'secondary', 'success', 'warning', 'error'
  variant = 'primary',
  // Button color - theme color key or custom color
  color,
  // Button size: 'xs', 'sm', 'md', 'lg', 'xl'
  size = 'md',
  // Disabled state
  disabled = false,
  // Press handler
  onPress,
  // Long press handler
  onLongPress,
  // Ionicons icon name (e.g., 'add', 'menu', 'share')
  icon = 'add',
  // Badge text (max 10 characters) to display
  badge = null,
  // Badge color
  badgeColor = 'error',
  // Position: 'top-left', 'top', 'top-right', 'left', 'right', 'bottom-left', 'bottom', 'bottom-right'
  position = 'bottom-right',
  // Padding from edges
  edgePadding = 16,
  // Custom offset from position
  offsetX = 0,
  offsetY = 0,
  // Shadow elevation (0-24)
  elevation = 6,
  // Style overrides
  style,
  ...props
}, ref) => {
  const { theme } = useTheme();
  
  // Animation values
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const [isDragging] = useState(false); // kept for zIndex consistency

  // Size configurations
  const sizes = {
    xs: { size: 36, iconSize: 18, badge: { top: -4, right: -4, minSize: 14 } },
    sm: { size: 44, iconSize: 22, badge: { top: -4, right: -4, minSize: 16 } },
    md: { size: 56, iconSize: 28, badge: { top: -6, right: -6, minSize: 18 } },
    lg: { size: 68, iconSize: 32, badge: { top: -8, right: -8, minSize: 20 } },
    xl: { size: 80, iconSize: 36, badge: { top: -10, right: -10, minSize: 22 } },
  };

  const sizeConfig = sizes[size] || sizes.md;

  // Determine color based on variant or explicit color prop
  const getButtonColor = () => {
    if (color) {
      return theme.colors[color] || color;
    }
    // Map variants to theme colors
    const variantColors = {
      primary: theme.colors.primary,
      secondary: theme.colors.secondary,
      success: theme.colors.success,
      warning: theme.colors.warning,
      error: theme.colors.error,
    };
    return variantColors[variant] || theme.colors.primary;
  };

  const buttonColor = getButtonColor();
  const iconColor = theme.colors.textContrast || '#FFFFFF';

  // Calculate position based on position prop
  const getPositionStyle = () => {
    const fabSize = sizeConfig.size;
    const halfSize = fabSize / 2;
    
    const positions = {
      'top-left': {
        top: edgePadding + offsetY,
        left: edgePadding + offsetX,
      },
      'top': {
        top: edgePadding + offsetY,
        left: '50%',
        marginLeft: -halfSize + offsetX,
      },
      'top-right': {
        top: edgePadding + offsetY,
        right: edgePadding - offsetX,
      },
      'left': {
        top: '50%',
        left: edgePadding + offsetX,
        marginTop: -halfSize + offsetY,
      },
      'right': {
        top: '50%',
        right: edgePadding - offsetX,
        marginTop: -halfSize + offsetY,
      },
      'bottom-left': {
        bottom: edgePadding - offsetY,
        left: edgePadding + offsetX,
      },
      'bottom': {
        bottom: edgePadding - offsetY,
        left: '50%',
        marginLeft: -halfSize + offsetX,
      },
      'bottom-right': {
        bottom: edgePadding - offsetY,
        right: edgePadding - offsetX,
      },
    };

    return positions[position] || positions['bottom-right'];
  };

  // Draggable behavior removed for mobile; FAB is fixed at configured position.

  // Entry animation
  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Press handlers
  const handlePressIn = () => {
    if (disabled) return;
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.92,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    if (disabled) return;
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = () => {
    if (disabled || isDragging) return;
    onPress?.();
  };

  // Get icon name (convert to Ionicons format if needed)
  const getIconName = () => {
    // If it's already in Ionicons format, use as-is
    if (icon.includes('-')) {
      return icon;
    }
    // Common icon mappings
    const iconMap = {
      add: 'add',
      plus: 'add',
      menu: 'menu',
      share: 'share-outline',
      edit: 'pencil',
      delete: 'trash-outline',
      close: 'close',
      check: 'checkmark',
      settings: 'settings-outline',
      search: 'search',
      home: 'home-outline',
      star: 'star',
      heart: 'heart',
      send: 'send',
      camera: 'camera-outline',
      image: 'image-outline',
      location: 'location-outline',
      call: 'call-outline',
      mail: 'mail-outline',
      chat: 'chatbubble-outline',
      notifications: 'notifications-outline',
      person: 'person-outline',
    };
    return iconMap[icon] || icon;
  };

  // Shadow configuration
  const shadowStyle = Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: elevation / 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: elevation,
    },
    android: {
      elevation: elevation,
    },
  });

  // Render badge
  const renderBadge = () => {
    if (!badge) return null;
    
    const badgeText = String(badge).slice(0, 10);
    const badgeConfig = sizeConfig.badge;
    
    return (
      <View style={[
        styles.badgeContainer,
        {
          top: badgeConfig.top,
          right: badgeConfig.right,
        }
      ]}>
        <Badge
          variant="filled"
          color={badgeColor}
          size={size === 'xs' || size === 'sm' ? 'sm' : 'md'}
        >
          {badgeText}
        </Badge>
      </View>
    );
  };

  // Determine positioning style
  const getContainerStyle = () => {
    return {
      position: 'absolute',
      ...getPositionStyle(),
    };
  };

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  return (
    <Animated.View
      ref={ref}
      style={[
        styles.container,
        getContainerStyle(),
        { zIndex: isDragging ? 1001 : 1000 },
      ]}
    >
      <AnimatedPressable
        onPress={handlePress}
        onLongPress={onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[
          styles.fab,
          {
            width: sizeConfig.size,
            height: sizeConfig.size,
            borderRadius: sizeConfig.size / 2,
            backgroundColor: buttonColor,
            opacity: disabled ? 0.5 : opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
          shadowStyle,
          style,
        ]}
        accessibilityRole="button"
        accessibilityLabel={props.accessibilityLabel || `Floating action button`}
        accessibilityState={{ disabled }}
        {...props}
      >
        <Ionicons
          name={getIconName()}
          size={sizeConfig.iconSize}
          color={iconColor}
        />
      </AnimatedPressable>
      
      {renderBadge()}
    </Animated.View>
  );
});

FloatingActionButton.displayName = 'FloatingActionButton';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    zIndex: 1,
  },
});

export default FloatingActionButton;
