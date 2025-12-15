import React, { useRef, useState, useCallback, useEffect, forwardRef } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { Badge } from './Badge';

/**
 * FloatingActionButton - Enhanced floating action button with complete positional awareness
 * Based on Button component but with absolute/fixed positioning and parent container awareness
 *
 * Key Features:
 * - Complete positional awareness with 9 position variants
 * - Draggable functionality within parent container boundaries
 * - Snap to edges with configurable threshold
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
  // Draggable functionality
  draggable = false,
  // Enable snapping to container edges when dragging ends
  snapToEdges = true,
  // Distance from edge (in pixels) to trigger snapping
  snapThreshold = 80,
  // Padding from edges when snapping
  edgePadding = 16,
  // Custom offset from position (can fine-tune placement)
  offsetX = 0,
  offsetY = 0,
  // Shadow elevation (0-24)
  elevation = 6,
  // Container dimensions (required for draggable or if parent doesn't have explicit dimensions)
  containerWidth,
  containerHeight,
  // Callback when drag starts
  onDragStart,
  // Callback when drag ends with final position
  onDragEnd,
  // Style overrides
  style,
  ...props
}, ref) => {
  const { theme } = useTheme();
  
  // Animation values
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  
  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;
  const lastPosition = useRef({ x: 0, y: 0 });
  
  // Get container dimensions
  const [containerDims, setContainerDims] = useState({
    width: containerWidth || Dimensions.get('window').width,
    height: containerHeight || Dimensions.get('window').height,
  });

  // Update container dims if props change
  useEffect(() => {
    if (containerWidth && containerHeight) {
      setContainerDims({ width: containerWidth, height: containerHeight });
    }
  }, [containerWidth, containerHeight]);

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

  // Calculate initial position for draggable FAB
  const calculateInitialPosition = useCallback(() => {
    const fabSize = sizeConfig.size;
    const { width, height } = containerDims;
    
    let x, y;
    
    switch (position) {
      case 'top-left':
        x = edgePadding;
        y = edgePadding;
        break;
      case 'top':
        x = (width - fabSize) / 2;
        y = edgePadding;
        break;
      case 'top-right':
        x = width - fabSize - edgePadding;
        y = edgePadding;
        break;
      case 'left':
        x = edgePadding;
        y = (height - fabSize) / 2;
        break;
      case 'right':
        x = width - fabSize - edgePadding;
        y = (height - fabSize) / 2;
        break;
      case 'bottom-left':
        x = edgePadding;
        y = height - fabSize - edgePadding;
        break;
      case 'bottom':
        x = (width - fabSize) / 2;
        y = height - fabSize - edgePadding;
        break;
      case 'bottom-right':
      default:
        x = width - fabSize - edgePadding;
        y = height - fabSize - edgePadding;
        break;
    }
    
    // Apply offsets
    x += offsetX;
    y += offsetY;
    
    // Clamp to bounds
    x = Math.max(edgePadding, Math.min(x, width - fabSize - edgePadding));
    y = Math.max(edgePadding, Math.min(y, height - fabSize - edgePadding));
    
    return { x, y };
  }, [position, sizeConfig.size, containerDims, edgePadding, offsetX, offsetY]);

  // Initialize drag position
  useEffect(() => {
    if (draggable) {
      const initialPos = calculateInitialPosition();
      pan.setValue(initialPos);
      lastPosition.current = initialPos;
    }
  }, [draggable, calculateInitialPosition]);

  // Calculate snap position
  const calculateSnapPosition = useCallback((x, y) => {
    if (!snapToEdges) {
      return { x, y };
    }
    
    const fabSize = sizeConfig.size;
    const { width, height } = containerDims;
    
    const distanceToLeft = x - edgePadding;
    const distanceToRight = width - x - fabSize - edgePadding;
    const distanceToTop = y - edgePadding;
    const distanceToBottom = height - y - fabSize - edgePadding;
    
    const minHorizontal = Math.min(Math.abs(distanceToLeft), Math.abs(distanceToRight));
    const minVertical = Math.min(Math.abs(distanceToTop), Math.abs(distanceToBottom));
    
    let snapX = x;
    let snapY = y;
    
    // Snap horizontally if within threshold
    if (minHorizontal <= snapThreshold) {
      if (Math.abs(distanceToLeft) < Math.abs(distanceToRight)) {
        snapX = edgePadding;
      } else {
        snapX = width - fabSize - edgePadding;
      }
    }
    
    // Snap vertically if within threshold
    if (minVertical <= snapThreshold) {
      if (Math.abs(distanceToTop) < Math.abs(distanceToBottom)) {
        snapY = edgePadding;
      } else {
        snapY = height - fabSize - edgePadding;
      }
    }
    
    return { x: snapX, y: snapY };
  }, [snapToEdges, snapThreshold, sizeConfig.size, containerDims, edgePadding]);

  // PanResponder for drag functionality
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => draggable,
      onMoveShouldSetPanResponder: () => draggable,
      onPanResponderGrant: () => {
        setIsDragging(true);
        pan.setOffset({
          x: lastPosition.current.x,
          y: lastPosition.current.y,
        });
        pan.setValue({ x: 0, y: 0 });
        
        // Scale up slightly when dragging starts
        Animated.spring(scaleAnim, {
          toValue: 1.1,
          friction: 5,
          useNativeDriver: true,
        }).start();
        
        onDragStart?.();
      },
      onPanResponderMove: (_, gestureState) => {
        const fabSize = sizeConfig.size;
        const { width, height } = containerDims;
        
        // Calculate new position
        let newX = lastPosition.current.x + gestureState.dx;
        let newY = lastPosition.current.y + gestureState.dy;
        
        // Clamp to bounds
        newX = Math.max(edgePadding, Math.min(newX, width - fabSize - edgePadding));
        newY = Math.max(edgePadding, Math.min(newY, height - fabSize - edgePadding));
        
        pan.setValue({
          x: newX - lastPosition.current.x,
          y: newY - lastPosition.current.y,
        });
      },
      onPanResponderRelease: (_, gestureState) => {
        setIsDragging(false);
        pan.flattenOffset();
        
        const fabSize = sizeConfig.size;
        const { width, height } = containerDims;
        
        // Calculate final position
        let finalX = lastPosition.current.x + gestureState.dx;
        let finalY = lastPosition.current.y + gestureState.dy;
        
        // Clamp to bounds
        finalX = Math.max(edgePadding, Math.min(finalX, width - fabSize - edgePadding));
        finalY = Math.max(edgePadding, Math.min(finalY, height - fabSize - edgePadding));
        
        // Calculate snap position
        const snapPos = calculateSnapPosition(finalX, finalY);
        
        // Animate to final/snap position
        Animated.parallel([
          Animated.spring(pan, {
            toValue: snapPos,
            friction: 7,
            tension: 40,
            useNativeDriver: false,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
          }),
        ]).start();
        
        lastPosition.current = snapPos;
        onDragEnd?.(snapPos);
      },
    })
  ).current;

  // Update pan responder when draggable changes
  useEffect(() => {
    panResponder.panHandlers.onStartShouldSetPanResponder = () => draggable;
    panResponder.panHandlers.onMoveShouldSetPanResponder = () => draggable;
  }, [draggable]);

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
    if (draggable) {
      return {
        position: 'absolute',
        left: 0,
        top: 0,
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
      };
    }
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
      {...(draggable ? panResponder.panHandlers : {})}
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
