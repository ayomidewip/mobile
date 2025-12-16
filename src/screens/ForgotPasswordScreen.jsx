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
 * ForgotPasswordScreen - Password reset request screen
 * 
 * @param {object} navigation - React Navigation prop
 */
export const ForgotPasswordScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { forgotPassword, isLoading, error, clearError } = useAuth();

  // Form state
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  // Validate form
  const validateForm = () => {
    if (!email.trim()) {
      setFormError('Email is required');
      return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError('Please enter a valid email address');
      return false;
    }
    
    setFormError(null);
    return true;
  };

  // Handle forgot password submission
  const handleSubmit = async () => {
    clearError();
    
    if (!validateForm()) {
      return;
    }

    try {
      const result = await forgotPassword(email.trim().toLowerCase());
      
      if (result.success) {
        setEmailSent(true);
      }
    } catch (e) {
      // For security, we show success even if email doesn't exist
      // The server already handles this, but we ensure consistent UX
      setEmailSent(true);
    }
  };

  // Success state after email is sent
  if (emailSent) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <Container flex={1} padding="lg" justify="center" align="center">
          {/* Success Icon */}
          <Container 
            background="primary"
            padding="lg"
            borderRadius="full"
            style={{ 
              width: 80, 
              height: 80, 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: theme.colors.primary + '20',
              marginBottom: theme.spacing.xl,
            }}
          >
            <Ionicons 
              name="mail-outline" 
              size={40} 
              color={theme.colors.primary} 
            />
          </Container>

          {/* Success Message */}
          <Typography variant="h3" weight="bold" align="center">
            Check Your Email
          </Typography>
          <Typography 
            variant="body" 
            color="secondary" 
            align="center"
            style={{ marginTop: theme.spacing.md, paddingHorizontal: theme.spacing.lg }}
          >
            If an account exists with {email}, you will receive a password reset link shortly.
          </Typography>

          {/* Instructions Card */}
          <Card 
            variant="outlined" 
            padding="lg" 
            gap="sm"
            style={{ marginTop: theme.spacing.xl, width: '100%' }}
          >
            <Typography variant="caption" color="secondary">
              • Check your inbox and spam folder
            </Typography>
            <Typography variant="caption" color="secondary">
              • The link will expire in 10 minutes
            </Typography>
            <Typography variant="caption" color="secondary">
              • Click the link to reset your password
            </Typography>
          </Card>

          {/* Back to Login Button */}
          <Button
            variant="ghost"
            color="primary"
            size="lg"
            onPress={() => navigation.goBack()}
            style={{ marginTop: theme.spacing.xl }}
            icon="arrow-back"
          >
            Back to Login
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
                  name="key-outline" 
                  size={32} 
                  color={theme.colors.primary} 
                />
              </Container>

              <Typography variant="h2" weight="bold" align="center">
                Forgot Password?
              </Typography>
              <Typography 
                variant="body" 
                color="secondary" 
                align="center"
                style={{ marginTop: theme.spacing.sm }}
              >
                No worries, we'll send you reset instructions.
              </Typography>
            </Container>

            {/* Forgot Password Form Card */}
            <Card variant="elevated" padding="xl" gap="md">
              {/* Email Input */}
              <Input
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setFormError(null);
                }}
                icon="mail"
                type="email"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                validationState={formError ? 'error' : 'default'}
                helpText={formError}
                required
                disabled={isLoading}
              />

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
                Send Reset Link
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

            {/* Back to Login Link */}
            <Container 
              layout="row" 
              justify="center" 
              align="center" 
              gap="xs"
              margin={{ top: 'xl' }}
            >
              <Typography variant="body" color="secondary">
                Remember your password?
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

export default ForgotPasswordScreen;
