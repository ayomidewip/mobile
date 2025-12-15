import React, { useState } from 'react';
import { ScrollView, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, themeNames } from '../contexts/ThemeContext';
import { Typography } from '../components/Typography';
import { IconButton, Button } from '../components/Button';
import { Container } from '../components/Container';
import { Card } from '../components/Card';
import { Divider } from '../components/Divider';
import { Input, SearchInput } from '../components/Input';
import { Switch, Checkbox } from '../components/Switch';
import { Badge, NotificationBadge } from '../components/Badge';
import { Select } from '../components/Select';
import { FloatingActionButton } from '../components/FloatingActionButton';

// Component Metadata Configuration
const COMPONENT_METADATA = {
  Typography: {
    component: Typography,
    defaultProps: {
      children: 'The quick brown fox jumps over the lazy dog',
      variant: 'body',
      font: 'primary',
      color: 'text',
      weight: 'regular',
      align: 'left',
    },
    propConfigs: {
      children: { type: 'text', label: 'Text' },
      variant: { type: 'select', label: 'Variant', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'caption', 'overline', 'monospace'] },
      font: { type: 'select', label: 'Font Family', options: ['primary', 'secondary', 'monospace'] },
      color: { type: 'select', label: 'Color', options: ['text', 'primary', 'secondary', 'success', 'warning', 'error'] },
      weight: { type: 'select', label: 'Weight', options: ['thin', 'extralight', 'light', 'regular', 'medium', 'semibold', 'bold', 'extrabold', 'black'] },
      align: { type: 'select', label: 'Align', options: ['left', 'center', 'right'] },
    }
  },
  Button: {
    component: Button,
    defaultProps: {
      children: 'Button',
      variant: 'filled',
      color: 'primary',
      size: 'md',
      disabled: false,
      loading: false,
      fullWidth: false,
      icon: 'star',
      iconPosition: 'left',
    },
    propConfigs: {
      children: { type: 'text', label: 'Label' },
      variant: { type: 'select', label: 'Variant', options: ['filled', 'outline', 'ghost'] },
      color: { type: 'select', label: 'Color', options: ['primary', 'secondary', 'success', 'warning', 'error'] },
      size: { type: 'select', label: 'Size', options: ['sm', 'md', 'lg'] },
      disabled: { type: 'boolean', label: 'Disabled' },
      loading: { type: 'boolean', label: 'Loading' },
      fullWidth: { type: 'boolean', label: 'Full Width' },
      icon: { type: 'text', label: 'Icon Name (Ionicons)' },
      iconPosition: { type: 'select', label: 'Icon Position', options: ['left', 'right'] },
    }
  },
  IconButton: {
    component: IconButton,
    defaultProps: {
      icon: 'heart',
      label: 'Like',
      size: 'md',
      color: 'text',
      selectedColor: 'error',
      selected: false,
      disabled: false,
    },
    propConfigs: {
      icon: { type: 'text', label: 'Icon' },
      label: { type: 'text', label: 'Label' },
      size: { type: 'select', label: 'Size', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
      color: { type: 'select', label: 'Color', options: ['text', 'primary', 'secondary'] },
      selectedColor: { type: 'select', label: 'Selected Color', options: ['primary', 'secondary', 'error', 'success'] },
      selected: { type: 'boolean', label: 'Selected' },
      disabled: { type: 'boolean', label: 'Disabled' },
    }
  },
  Badge: {
    component: Badge,
    defaultProps: {
      children: 'New',
      variant: 'filled',
      color: 'primary',
      size: 'md',
    },
    propConfigs: {
      children: { type: 'text', label: 'Content' },
      variant: { type: 'select', label: 'Variant', options: ['filled', 'outline', 'dot'] },
      color: { type: 'select', label: 'Color', options: ['primary', 'secondary', 'success', 'warning', 'error'] },
      size: { type: 'select', label: 'Size', options: ['sm', 'md', 'lg'] },
    }
  },
  Input: {
    component: Input,
    defaultProps: {
      label: 'Email Address',
      placeholder: 'Enter your email',
      value: '',
      variant: 'outline',
      color: 'primary',
      size: 'md',
      validationState: 'default',
      helpText: 'We will never share your email.',
      disabled: false,
      secureTextEntry: false,
      icon: 'mail',
      required: false,
      type: 'text',
    },
    propConfigs: {
      label: { type: 'text', label: 'Label' },
      placeholder: { type: 'text', label: 'Placeholder' },
      value: { type: 'text', label: 'Value' },
      variant: { type: 'select', label: 'Variant', options: ['default', 'outline', 'filled', 'underline', 'floating'] },
      color: { type: 'select', label: 'Color', options: ['primary', 'secondary', 'tertiary'] },
      size: { type: 'select', label: 'Size', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
      type: { type: 'select', label: 'Type', options: ['text', 'email', 'password'] },
      validationState: { type: 'select', label: 'State', options: ['default', 'success', 'warning', 'error'] },
      helpText: { type: 'text', label: 'Help Text' },
      disabled: { type: 'boolean', label: 'Disabled' },
      secureTextEntry: { type: 'boolean', label: 'Secure' },
      required: { type: 'boolean', label: 'Required' },
      icon: { type: 'text', label: 'Icon' },
    }
  },
  Select: {
    component: Select,
    defaultProps: {
      label: 'Country',
      placeholder: 'Select a country...',
      value: '',
      variant: 'outline',
      color: 'primary',
      size: 'md',
      multiSelect: false,
      searchable: true,
      helpText: 'Choose your country of residence',
      disabled: false,
      required: false,
      options: [
        { value: 'us', label: 'United States' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'ca', label: 'Canada' },
        { value: 'au', label: 'Australia' },
        { value: 'de', label: 'Germany' },
        { value: 'fr', label: 'France' },
        { value: 'jp', label: 'Japan' },
        { value: 'br', label: 'Brazil' },
      ],
    },
    propConfigs: {
      label: { type: 'text', label: 'Label' },
      placeholder: { type: 'text', label: 'Placeholder' },
      variant: { type: 'select', label: 'Variant', options: ['default', 'outline', 'filled', 'underline'] },
      color: { type: 'select', label: 'Color', options: ['primary', 'secondary', 'tertiary'] },
      size: { type: 'select', label: 'Size', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
      multiSelect: { type: 'boolean', label: 'Multi Select' },
      searchable: { type: 'boolean', label: 'Searchable' },
      helpText: { type: 'text', label: 'Help Text' },
      disabled: { type: 'boolean', label: 'Disabled' },
      required: { type: 'boolean', label: 'Required' },
    }
  },
  Switch: {
    component: Switch,
    defaultProps: {
      label: 'Enable Notifications',
      value: true,
      labelPosition: 'left',
      color: 'primary',
      disabled: false,
    },
    propConfigs: {
      label: { type: 'text', label: 'Label' },
      value: { type: 'boolean', label: 'Checked' },
      labelPosition: { type: 'select', label: 'Label Position', options: ['left', 'right'] },
      color: { type: 'select', label: 'Color', options: ['primary', 'secondary', 'success', 'warning', 'error'] },
      disabled: { type: 'boolean', label: 'Disabled' },
    }
  },
  Card: {
    component: Card,
    defaultProps: {
      variant: 'elevated',
      padding: 'lg',
      shadow: 'md',
    },
    propConfigs: {
      variant: { type: 'select', label: 'Variant', options: ['elevated', 'outlined', 'filled'] },
      padding: { type: 'select', label: 'Padding', options: ['sm', 'md', 'lg', 'xl'] },
      shadow: { type: 'select', label: 'Shadow', options: ['none', 'sm', 'md', 'lg', 'xl'] },
    },
    renderChildren: () => (
      <View>
        <Typography variant="h6">Card Title</Typography>
        <Typography variant="body" style={{ marginTop: 4, opacity: 0.7 }}>
          This is a sample card content to demonstrate the card component capabilities.
        </Typography>
        <View style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button size="sm" variant="ghost">Cancel</Button>
          <Button size="sm" style={{ marginLeft: 8 }}>Action</Button>
        </View>
      </View>
    )
  },
  FloatingActionButton: {
    component: FloatingActionButton,
    defaultProps: {
      variant: 'primary',
      size: 'md',
      icon: 'add',
      position: 'bottom-right',
      badge: '',
      badgeColor: 'error',
      disabled: false,
      draggable: false,
      snapToEdges: true,
      elevation: 6,
    },
    propConfigs: {
      variant: { type: 'select', label: 'Variant', options: ['primary', 'secondary', 'success', 'warning', 'error'] },
      size: { type: 'select', label: 'Size', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
      icon: { type: 'text', label: 'Icon (Ionicons)' },
      position: { type: 'select', label: 'Position', options: ['top-left', 'top', 'top-right', 'left', 'right', 'bottom-left', 'bottom', 'bottom-right'] },
      badge: { type: 'text', label: 'Badge Text' },
      badgeColor: { type: 'select', label: 'Badge Color', options: ['primary', 'secondary', 'success', 'warning', 'error'] },
      disabled: { type: 'boolean', label: 'Disabled' },
      draggable: { type: 'boolean', label: 'Draggable' },
      snapToEdges: { type: 'boolean', label: 'Snap to Edges' },
    },
    // FAB needs container with explicit dimensions for positioning
    requiresContainer: true,
  }
};

export const ComponentDemo = () => {
  const { theme, themeName, switchTheme } = useTheme();
  const [selectedComponent, setSelectedComponent] = useState('Button');
  const [props, setProps] = useState(COMPONENT_METADATA['Button'].defaultProps);

  const handleComponentSelect = (compName) => {
    setSelectedComponent(compName);
    setProps(COMPONENT_METADATA[compName].defaultProps);
  };

  const handlePropChange = (key, value) => {
    setProps(prev => ({ ...prev, [key]: value }));
  };

  const CurrentComponent = COMPONENT_METADATA[selectedComponent].component;
  const metadata = COMPONENT_METADATA[selectedComponent];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar
        barStyle={theme.statusBar?.barStyle || 'dark-content'}
        backgroundColor={theme.statusBar?.backgroundColor || theme.colors.background}
      />
      
      {/* Header */}
      <Container padding="md" >
        <Container layout="row" justify="space-between" align="center">
          <Typography variant="h5">Component Demo</Typography>
          <Button 
            variant="outline" 
            size="sm" 
            onPress={() => {
              const currentIndex = themeNames.indexOf(themeName);
              const nextIndex = (currentIndex + 1) % themeNames.length;
              switchTheme(themeNames[nextIndex]);
            }}
          >
            {`Theme: ${themeName}`}
          </Button>
        </Container>
        
        {/* Component Selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={{ marginTop: theme.spacing.md }}
          contentContainerStyle={{ gap: theme.spacing.sm }}
        >
          {Object.keys(COMPONENT_METADATA).map(compName => (
            <Button
              key={compName}
              variant={selectedComponent === compName ? 'filled' : 'outline'}
              size="sm"
              onPress={() => handleComponentSelect(compName)}
            >
              {compName}
            </Button>
          ))}
        </ScrollView>
      </Container>

      <Divider />

      <ScrollView style={{ flex: 1 }}>
        {/* Live Demo Area */}
        <Card 
          variant="outlined" 
          padding="xl"
          style={{ 
            margin: theme.spacing.lg, 
            minHeight: 200,
            alignItems: 'center',
            justifyContent: 'center',
            // FAB needs relative positioning on parent
            ...(metadata.requiresContainer && { position: 'relative', overflow: 'hidden' }),
          }}
        >
          {metadata.requiresContainer ? (
            // For FAB, we render in a container with explicit dimensions
            <View style={{ 
              width: '100%', 
              height: 200, 
              position: 'relative',
              backgroundColor: theme.colors.surface,
              borderRadius: theme.borderRadius.md,
            }}>
              <CurrentComponent 
                {...props}
                containerWidth={300}
                containerHeight={200}
                onPress={() => console.log('FAB pressed!')}
              />
              <Typography 
                variant="caption" 
                align="center" 
                style={{ 
                  position: 'absolute', 
                  bottom: 8, 
                  left: 0, 
                  right: 0,
                  opacity: 0.6,
                }}
              >
                {props.draggable ? 'Drag me around!' : 'Tap or enable draggable'}
              </Typography>
            </View>
          ) : (
            <CurrentComponent 
              {...props}
              // Wire up change handlers for interactive components
              onChangeText={selectedComponent === 'Input' ? (text) => handlePropChange('value', text) : props.onChangeText}
              onValueChange={selectedComponent === 'Switch' ? (val) => handlePropChange('value', val) : props.onValueChange}
              onChange={selectedComponent === 'Select' ? (val) => handlePropChange('value', val) : props.onChange}
            >
              {metadata.renderChildren ? metadata.renderChildren(props) : props.children}
            </CurrentComponent>
          )}
        </Card>

        <Divider />

        {/* Props Control Panel */}
        <Container padding="lg" gap="md">
          <Typography variant="h6">Properties</Typography>
          
          {Object.entries(metadata.propConfigs).map(([key, config]) => (
            <Container key={key} gap="sm">
              <Typography variant="caption" weight="semibold">{config.label}</Typography>
              
              {config.type === 'text' && (
                <Input
                  value={String(props[key] || '')}
                  onChangeText={(text) => handlePropChange(key, text)}
                />
              )}
              
              {config.type === 'boolean' && (
                <Switch
                  value={!!props[key]}
                  onValueChange={(val) => handlePropChange(key, val)}
                />
              )}
              
              {config.type === 'select' && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <Container layout="row" gap="sm">
                    {config.options.map(option => (
                      <Button
                        key={option}
                        variant={props[key] === option ? 'filled' : 'outline'}
                        size="sm"
                        onPress={() => handlePropChange(key, option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </Container>
                </ScrollView>
              )}
            </Container>
          ))}
        </Container>
        
        {/* Bottom padding */}
        <View style={{ height: theme.spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
};
