import React, { useState } from 'react';
import { 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  Pressable,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Typography, Button, Container, Card, Input } from '../components/Components';

/**
 * SignupScreen - User registration screen
 * 
 * @param {object} navigation - React Navigation prop
 */
export const SignupScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { signup, isLoading, error, clearError } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [validationState, setValidationState] = useState({});

  // Update form field
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setFormErrors(prev => ({ ...prev, [field]: null }));
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    }

    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle signup submission
  const handleSignup = async () => {
    clearError();
    
    if (!validateForm()) {
      return;
    }

    try {
      const result = await signup({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        username: formData.username.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (result.success) {
        Alert.alert(
          'Account Created',
          result.message || 'Your account has been created successfully!'
          // AuthContext updates isAuthenticated, Navigator switches automatically
        );
      }
    } catch (e) {
      Alert.alert('Signup Failed', e.message || 'Please check your information and try again.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Container 
            flex={1} 
            padding="lg" 
            justify="center"
          >
            {/* Header */}
            <Container align="center" margin={{ bottom: 'lg' }}>
              <Typography variant="h2" weight="bold" align="center">
                Create Account
              </Typography>
              <Typography 
                variant="body" 
                color="secondary" 
                align="center"
                style={{ marginTop: theme.spacing.sm }}
              >
                Sign up to get started
              </Typography>
            </Container>

            {/* Signup Form Card */}
            <Card variant="elevated" padding="xl" gap="md">
              {/* Name Row */}
              <Container layout="row" gap="md">
                <Container flex={1}>
                  <Input
                    label="First Name"
                    placeholder="John"
                    value={formData.firstName}
                    onChangeText={(text) => updateField('firstName', text)}
                    icon="person"
                    autoCapitalize="words"
                    validationState={formErrors.firstName ? 'error' : 'default'}
                    helpText={formErrors.firstName}
                    required
                    disabled={isLoading}
                  />
                </Container>
                <Container flex={1}>
                  <Input
                    label="Last Name"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChangeText={(text) => updateField('lastName', text)}
                    autoCapitalize="words"
                    validationState={formErrors.lastName ? 'error' : 'default'}
                    helpText={formErrors.lastName}
                    required
                    disabled={isLoading}
                  />
                </Container>
              </Container>

              {/* Username Input */}
              <Input
                label="Username"
                placeholder="johndoe"
                value={formData.username}
                onChangeText={(text) => updateField('username', text)}
                icon="at"
                autoCapitalize="none"
                autoCorrect={false}
                validationState={formErrors.username ? 'error' : 'default'}
                helpText={formErrors.username || 'Letters, numbers, and underscores only'}
                required
                disabled={isLoading}
              />

              {/* Email Input */}
              <Input
                label="Email Address"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChangeText={(text) => updateField('email', text)}
                icon="mail"
                type="email"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                validationState={formErrors.email ? 'error' : 'default'}
                helpText={formErrors.email}
                required
                disabled={isLoading}
              />

              {/* Password Input */}
              <Input
                label="Password"
                placeholder="Create a strong password"
                value={formData.password}
                onChangeText={(text) => updateField('password', text)}
                icon="lock-closed"
                type="password"
                secureTextEntry
                validationState={formErrors.password ? 'error' : 'default'}
                helpText={formErrors.password || 'Min 8 chars, uppercase, lowercase, and number'}
                required
                disabled={isLoading}
              />

              {/* Confirm Password Input */}
              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChangeText={(text) => updateField('confirmPassword', text)}
                icon="lock-closed"
                type="password"
                secureTextEntry
                confirmField={formData.password}
                validationState={formErrors.confirmPassword ? 'error' : 'default'}
                helpText={formErrors.confirmPassword}
                required
                disabled={isLoading}
              />

              {/* Signup Button */}
              <Button
                variant="filled"
                color="primary"
                size="lg"
                fullWidth
                onPress={handleSignup}
                loading={isLoading}
                disabled={isLoading}
                style={{ marginTop: theme.spacing.md }}
              >
                Create Account
              </Button>

              {/* Error Display */}
              {error && (
                <Container 
                  background="error" 
                  padding="sm" 
                  borderRadius="md"
                  style={{ opacity: 0.1 }}
                >
                  <Typography variant="caption" color="error" align="center">
                    {error}
                  </Typography>
                </Container>
              )}
            </Card>

            {/* Login Link */}
            <Container 
              layout="row" 
              justify="center" 
              align="center" 
              gap="xs"
              margin={{ top: 'xl' }}
            >
              <Typography variant="body" color="secondary">
                Already have an account?
              </Typography>
              <Pressable onPress={() => navigation.goBack()} disabled={isLoading}>
                <Typography variant="body" color="primary" weight="semibold">
                  Sign In
                </Typography>
              </Pressable>
            </Container>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;
