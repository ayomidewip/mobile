import React, { useState } from 'react';
import { 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  Pressable,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Typography, Button, Container, Card, Input } from '../components/Components';

/**
 * ResetPasswordScreen - Set new password screen
 * 
 * @param {object} navigation - React Navigation prop
 * @param {object} route - React Navigation route (contains params.token)
 */
export const ResetPasswordScreen = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { resetPassword, isLoading, error, clearError } = useAuth();
  
  // Get token from route params (from deep link)
  const token = route?.params?.token;

  // Form state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [resetComplete, setResetComplete] = useState(false);

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      errors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle password reset submission
  const handleSubmit = async () => {
    clearError();
    
    if (!validateForm()) {
      return;
    }

    if (!token) {
      Alert.alert('Error', 'Invalid reset link. Please request a new password reset.');
      return;
    }

    try {
      const result = await resetPassword(token, password);
      
      if (result.success) {
        setResetComplete(true);
      }
    } catch (e) {
      Alert.alert(
        'Reset Failed', 
        e.message || 'Failed to reset password. The link may have expired.'
      );
    }
  };

  // Success state after password is reset
  if (resetComplete) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <Container flex={1} padding="lg" justify="center" align="center">
          {/* Success Icon */}
          <Container 
            style={{ 
              width: 80, 
              height: 80, 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: theme.colors.success + '20',
              borderRadius: 40,
              marginBottom: theme.spacing.xl,
            }}
          >
            <Ionicons 
              name="checkmark-circle-outline" 
              size={48} 
              color={theme.colors.success} 
            />
          </Container>

          {/* Success Message */}
          <Typography variant="h3" weight="bold" align="center">
            Password Reset!
          </Typography>
          <Typography 
            variant="body" 
            color="secondary" 
            align="center"
            style={{ marginTop: theme.spacing.md, paddingHorizontal: theme.spacing.lg }}
          >
            Your password has been successfully reset. You can now sign in with your new password.
          </Typography>

          {/* Continue Button */}
          <Button
            variant="filled"
            color="primary"
            size="lg"
            onPress={() => navigation.navigate('Login')}
            style={{ marginTop: theme.spacing.xl }}
          >
            Continue to Sign In
          </Button>
        </Container>
      </SafeAreaView>
    );
  }

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
            {/* Back Button */}
            <Pressable 
              onPress={() => navigation.goBack()}
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center',
                marginBottom: theme.spacing.xl,
              }}
            >
              <Ionicons 
                name="arrow-back" 
                size={24} 
                color={theme.colors.text} 
              />
              <Typography 
                variant="body" 
                style={{ marginLeft: theme.spacing.sm }}
              >
                Back
              </Typography>
            </Pressable>

            {/* Header */}
            <Container align="center" margin={{ bottom: 'xl' }}>
              {/* Icon */}
              <Container 
                style={{ 
                  width: 64, 
                  height: 64, 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: theme.colors.primary + '20',
                  borderRadius: 32,
                  marginBottom: theme.spacing.lg,
                }}
              >
                <Ionicons 
                  name="shield-checkmark-outline" 
                  size={32} 
                  color={theme.colors.primary} 
                />
              </Container>

              <Typography variant="h2" weight="bold" align="center">
                Set New Password
              </Typography>
              <Typography 
                variant="body" 
                color="secondary" 
                align="center"
                style={{ marginTop: theme.spacing.sm }}
              >
                Your new password must be different from previously used passwords.
              </Typography>
            </Container>

            {/* Reset Password Form Card */}
            <Card variant="elevated" padding="xl" gap="md">
              {/* Password Input */}
              <Input
                label="New Password"
                placeholder="Create a strong password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setFormErrors({ ...formErrors, password: null });
                }}
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
                label="Confirm New Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setFormErrors({ ...formErrors, confirmPassword: null });
                }}
                icon="lock-closed"
                type="password"
                secureTextEntry
                confirmField={password}
                validationState={formErrors.confirmPassword ? 'error' : 'default'}
                helpText={formErrors.confirmPassword}
                required
                disabled={isLoading}
              />

              {/* Password Requirements */}
              <Card variant="filled" padding="md" gap="xs">
                <Typography variant="caption" weight="medium">
                  Password Requirements:
                </Typography>
                <PasswordRequirement 
                  met={password.length >= 8} 
                  text="At least 8 characters" 
                  theme={theme}
                />
                <PasswordRequirement 
                  met={/[A-Z]/.test(password)} 
                  text="One uppercase letter" 
                  theme={theme}
                />
                <PasswordRequirement 
                  met={/[a-z]/.test(password)} 
                  text="One lowercase letter" 
                  theme={theme}
                />
                <PasswordRequirement 
                  met={/\d/.test(password)} 
                  text="One number" 
                  theme={theme}
                />
              </Card>

              {/* Submit Button */}
              <Button
                variant="filled"
                color="primary"
                size="lg"
                fullWidth
                onPress={handleSubmit}
                loading={isLoading}
                disabled={isLoading}
              >
                Reset Password
              </Button>

              {/* Error Display */}
              {error && (
                <Container 
                  padding="sm" 
                  borderRadius="md"
                  style={{ backgroundColor: theme.colors.error + '10' }}
                >
                  <Typography variant="caption" color="error" align="center">
                    {error}
                  </Typography>
                </Container>
              )}
            </Card>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

/**
 * Password requirement indicator
 */
const PasswordRequirement = ({ met, text, theme }) => (
  <Container layout="row" align="center" gap="xs">
    <Ionicons 
      name={met ? 'checkmark-circle' : 'ellipse-outline'} 
      size={16} 
      color={met ? theme.colors.success : theme.colors.textMuted} 
    />
    <Typography 
      variant="caption" 
      color={met ? 'success' : 'secondary'}
    >
      {text}
    </Typography>
  </Container>
);

export default ResetPasswordScreen;
