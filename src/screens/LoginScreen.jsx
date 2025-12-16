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
 * LoginScreen - User authentication screen
 * 
 * @param {object} navigation - React Navigation prop
 */
export const LoginScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { login, isLoading, error, clearError } = useAuth();

  // Form state
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorToken, setTwoFactorToken] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [validationState, setValidationState] = useState({
    identifier: { isValid: true },
    password: { isValid: true },
  });

  // Handle form validation
  const validateForm = () => {
    const errors = {};
    
    if (!identifier.trim()) {
      errors.identifier = 'Email or username is required';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    }

    if (showTwoFactor && !twoFactorToken) {
      errors.twoFactorToken = '2FA code is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle login submission
  const handleLogin = async () => {
    clearError();
    
    if (!validateForm()) {
      return;
    }

    try {
      const result = await login(
        identifier.trim(), 
        password,
        showTwoFactor ? twoFactorToken : null
      );

      if (result.requiresTwoFactor) {
        setShowTwoFactor(true);
        Alert.alert(
          'Two-Factor Authentication',
          'Please enter your 2FA code to continue.'
        );
        return;
      }

      // Success - AuthContext updates isAuthenticated, Navigator switches to main tabs
    } catch (e) {
      Alert.alert('Login Failed', e.message || 'Please check your credentials and try again.');
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
            <Container align="center" margin={{ bottom: 'xl' }}>
              <Typography variant="h2" weight="bold" align="center">
                Welcome Back
              </Typography>
              <Typography 
                variant="body" 
                color="secondary" 
                align="center"
                style={{ marginTop: theme.spacing.sm }}
              >
                Sign in to continue to your account
              </Typography>
            </Container>

            {/* Login Form Card */}
            <Card variant="elevated" padding="xl" gap="md">
              {/* Email/Username Input */}
              <Input
                label="Email or Username"
                placeholder="Enter your email or username"
                value={identifier}
                onChangeText={(text) => {
                  setIdentifier(text);
                  setFormErrors({ ...formErrors, identifier: null });
                }}
                icon="person"
                type="text"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                validationState={formErrors.identifier ? 'error' : 'default'}
                helpText={formErrors.identifier}
                required
                disabled={isLoading}
              />

              {/* Password Input */}
              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setFormErrors({ ...formErrors, password: null });
                }}
                icon="lock-closed"
                type="password"
                secureTextEntry
                validationState={formErrors.password ? 'error' : 'default'}
                helpText={formErrors.password}
                required
                disabled={isLoading}
              />

              {/* 2FA Input (conditional) */}
              {showTwoFactor && (
                <Input
                  label="Two-Factor Code"
                  placeholder="Enter your 2FA code"
                  value={twoFactorToken}
                  onChangeText={(text) => {
                    setTwoFactorToken(text);
                    setFormErrors({ ...formErrors, twoFactorToken: null });
                  }}
                  icon="key"
                  keyboardType="number-pad"
                  maxLength={6}
                  validationState={formErrors.twoFactorToken ? 'error' : 'default'}
                  helpText={formErrors.twoFactorToken}
                  required
                  disabled={isLoading}
                />
              )}

              {/* Forgot Password Link */}
              <Container align="flex-end">
                <Pressable onPress={() => navigation.navigate('ForgotPassword')} disabled={isLoading}>
                  <Typography 
                    variant="caption" 
                    color="primary"
                    weight="medium"
                  >
                    Forgot Password?
                  </Typography>
                </Pressable>
              </Container>

              {/* Login Button */}
              <Button
                variant="filled"
                color="primary"
                size="lg"
                fullWidth
                onPress={handleLogin}
                loading={isLoading}
                disabled={isLoading}
              >
                {showTwoFactor ? 'Verify & Sign In' : 'Sign In'}
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

            {/* Sign Up Link */}
            <Container 
              layout="row" 
              justify="center" 
              align="center" 
              gap="xs"
              margin={{ top: 'xl' }}
            >
              <Typography variant="body" color="secondary">
                Don't have an account?
              </Typography>
              <Pressable onPress={() => navigation.navigate('Signup')} disabled={isLoading}>
                <Typography variant="body" color="primary" weight="semibold">
                  Sign Up
                </Typography>
              </Pressable>
            </Container>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
