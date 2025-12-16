import React from 'react';
import { 
  ScrollView, 
  Pressable,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Typography, Button, Container, Card } from '../components/Components';

/**
 * SettingsScreen - App settings and user account management
 * 
 * @param {object} navigation - React Navigation prop
 */
export const SettingsScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { user, logout, isLoading } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Log Out', 
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (err) {
              Alert.alert('Error', 'Failed to log out. Please try again.');
            }
          }
        },
      ]
    );
  };

  const SettingsItem = ({ icon, title, subtitle, onPress, showArrow = true, danger = false }) => (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.md,
        backgroundColor: pressed ? theme.colors.surface : 'transparent',
        borderRadius: theme.borderRadius.md,
      })}
    >
      <Container 
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: danger ? theme.colors.error + '20' : theme.colors.primary + '20',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons 
          name={icon} 
          size={20} 
          color={danger ? theme.colors.error : theme.colors.primary} 
        />
      </Container>
      <Container style={{ flex: 1, marginLeft: theme.spacing.md }}>
        <Typography 
          variant="body" 
          weight="medium"
          color={danger ? 'error' : 'primary'}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="secondary">
            {subtitle}
          </Typography>
        )}
      </Container>
      {showArrow && (
        <Ionicons 
          name="chevron-forward" 
          size={20} 
          color={theme.colors.textMuted} 
        />
      )}
    </Pressable>
  );

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Container flex={1} padding="lg">
          {/* Header */}
          <Typography variant="h2" weight="bold" style={{ marginBottom: theme.spacing.xl }}>
            Settings
          </Typography>

          {/* User Profile Card */}
          <Card variant="elevated" padding="lg" style={{ marginBottom: theme.spacing.lg }}>
            <Container layout="row" align="center">
              <Container 
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: theme.colors.primary + '20',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons 
                  name="person" 
                  size={28} 
                  color={theme.colors.primary} 
                />
              </Container>
              <Container style={{ flex: 1, marginLeft: theme.spacing.md }}>
                <Typography variant="h4" weight="semibold">
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography variant="body" color="secondary">
                  {user?.email || 'user@example.com'}
                </Typography>
              </Container>
            </Container>
          </Card>

          {/* Account Section */}
          <Typography 
            variant="caption" 
            weight="semibold" 
            color="secondary"
            style={{ 
              marginBottom: theme.spacing.sm,
              marginLeft: theme.spacing.sm,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Account
          </Typography>
          <Card variant="outlined" padding="sm" style={{ marginBottom: theme.spacing.lg }}>
            <SettingsItem 
              icon="person-outline" 
              title="Edit Profile" 
              subtitle="Update your personal information"
              onPress={() => Alert.alert('Coming Soon', 'Profile editing will be available soon.')}
            />
            <SettingsItem 
              icon="lock-closed-outline" 
              title="Change Password" 
              subtitle="Update your password"
              onPress={() => Alert.alert('Coming Soon', 'Password change will be available soon.')}
            />
            <SettingsItem 
              icon="shield-checkmark-outline" 
              title="Security" 
              subtitle="Two-factor authentication & more"
              onPress={() => Alert.alert('Coming Soon', 'Security settings will be available soon.')}
            />
          </Card>

          {/* Preferences Section */}
          <Typography 
            variant="caption" 
            weight="semibold" 
            color="secondary"
            style={{ 
              marginBottom: theme.spacing.sm,
              marginLeft: theme.spacing.sm,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Preferences
          </Typography>
          <Card variant="outlined" padding="sm" style={{ marginBottom: theme.spacing.lg }}>
            <SettingsItem 
              icon="color-palette-outline" 
              title="Appearance" 
              subtitle="Theme & display options"
              onPress={() => Alert.alert('Coming Soon', 'Theme settings will be available soon.')}
            />
            <SettingsItem 
              icon="notifications-outline" 
              title="Notifications" 
              subtitle="Manage push notifications"
              onPress={() => Alert.alert('Coming Soon', 'Notification settings will be available soon.')}
            />
            <SettingsItem 
              icon="language-outline" 
              title="Language" 
              subtitle="English (US)"
              onPress={() => Alert.alert('Coming Soon', 'Language settings will be available soon.')}
            />
          </Card>

          {/* Support Section */}
          <Typography 
            variant="caption" 
            weight="semibold" 
            color="secondary"
            style={{ 
              marginBottom: theme.spacing.sm,
              marginLeft: theme.spacing.sm,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Support
          </Typography>
          <Card variant="outlined" padding="sm" style={{ marginBottom: theme.spacing.lg }}>
            <SettingsItem 
              icon="help-circle-outline" 
              title="Help Center" 
              subtitle="FAQs and support articles"
              onPress={() => Alert.alert('Coming Soon', 'Help center will be available soon.')}
            />
            <SettingsItem 
              icon="chatbubble-outline" 
              title="Contact Us" 
              subtitle="Get in touch with our team"
              onPress={() => Alert.alert('Coming Soon', 'Contact form will be available soon.')}
            />
            <SettingsItem 
              icon="document-text-outline" 
              title="Terms & Privacy" 
              subtitle="Legal information"
              onPress={() => Alert.alert('Coming Soon', 'Legal documents will be available soon.')}
            />
          </Card>

          {/* Logout Button */}
          <Card variant="outlined" padding="sm" style={{ marginBottom: theme.spacing.xl }}>
            <SettingsItem 
              icon="log-out-outline" 
              title="Log Out" 
              subtitle="Sign out of your account"
              onPress={handleLogout}
              showArrow={false}
              danger
            />
          </Card>

          {/* App Version */}
          <Container align="center" style={{ marginTop: 'auto', paddingBottom: theme.spacing.lg }}>
            <Typography variant="caption" color="secondary">
              App Version 1.0.0
            </Typography>
          </Container>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
