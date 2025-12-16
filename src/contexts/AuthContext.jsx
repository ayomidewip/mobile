import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Configuration
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

// Storage keys
const AUTH_STORAGE_KEY = '@auth_tokens';
const USER_STORAGE_KEY = '@auth_user';

const AuthContext = createContext(undefined);

/**
 * Custom hook to use auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * AuthProvider - Manages authentication state for the mobile app
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokens, setTokens] = useState({ accessToken: null, refreshToken: null });
  const [error, setError] = useState(null);

  /**
   * Store tokens securely
   */
  const storeTokens = async (accessToken, refreshToken) => {
    try {
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ accessToken, refreshToken }));
      setTokens({ accessToken, refreshToken });
    } catch (e) {
      console.error('Error storing tokens:', e);
    }
  };

  /**
   * Store user data
   */
  const storeUser = async (userData) => {
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
    } catch (e) {
      console.error('Error storing user:', e);
    }
  };

  /**
   * Clear all auth data
   */
  const clearAuthData = async () => {
    try {
      await AsyncStorage.multiRemove([AUTH_STORAGE_KEY, USER_STORAGE_KEY]);
      setTokens({ accessToken: null, refreshToken: null });
      setUser(null);
      setIsAuthenticated(false);
    } catch (e) {
      console.error('Error clearing auth data:', e);
    }
  };

  /**
   * Make authenticated API request
   */
  const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (tokens.accessToken) {
      headers['Authorization'] = `Bearer ${tokens.accessToken}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  };

  /**
   * Refresh access token
   */
  const refreshAccessToken = async () => {
    if (!tokens.refreshToken) return false;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: tokens.refreshToken }),
      });

      const data = await response.json();

      if (response.ok && data.accessToken) {
        await storeTokens(data.accessToken, data.refreshToken || tokens.refreshToken);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Token refresh failed:', e);
      return false;
    }
  };

  /**
   * Load stored auth state on app start
   */
  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const [storedTokens, storedUser] = await AsyncStorage.multiGet([
          AUTH_STORAGE_KEY,
          USER_STORAGE_KEY,
        ]);

        if (storedTokens[1]) {
          const parsedTokens = JSON.parse(storedTokens[1]);
          setTokens(parsedTokens);
        }

        if (storedUser[1]) {
          const parsedUser = JSON.parse(storedUser[1]);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.error('Error loading auth state:', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthState();
  }, []);

  /**
   * Login with email/username and password
   */
  const login = useCallback(async (identifier, password, twoFactorToken = null) => {
    setError(null);
    setIsLoading(true);

    try {
      const body = { identifier, password };
      if (twoFactorToken) {
        body.twoFactorToken = twoFactorToken;
      }

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Handle 2FA requirement
      if (data.requiresTwoFactor) {
        return { requiresTwoFactor: true, tempToken: data.tempToken };
      }

      // Store tokens if provided (for non-cookie auth)
      if (data.accessToken) {
        await storeTokens(data.accessToken, data.refreshToken);
      }

      // Store user data
      if (data.user) {
        await storeUser(data.user);
      }

      return { success: true, user: data.user };
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Sign up new user
   */
  const signup = useCallback(async (userData) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      // Store tokens if provided
      if (data.accessToken) {
        await storeTokens(data.accessToken, data.refreshToken);
      }

      // Store user data
      if (data.user) {
        await storeUser(data.user);
      }

      return { success: true, user: data.user, message: data.message };
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Logout user
   */
  const logout = useCallback(async () => {
    setIsLoading(true);

    try {
      // Call logout endpoint to invalidate tokens server-side
      if (tokens.accessToken) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.accessToken}`,
          },
        }).catch(() => {}); // Ignore errors - clear local state anyway
      }
    } finally {
      await clearAuthData();
      setIsLoading(false);
    }
  }, [tokens.accessToken]);

  /**
   * Request password reset
   */
  const forgotPassword = useCallback(async (email) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset email');
      }

      return { success: true, message: data.message };
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Reset password with token
   */
  const resetPassword = useCallback(async (token, newPassword) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password reset failed');
      }

      // Store new tokens if provided
      if (data.accessToken) {
        await storeTokens(data.accessToken, data.refreshToken);
      }

      // Store user data
      if (data.user) {
        await storeUser(data.user);
      }

      return { success: true, message: data.message };
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Get current user profile
   */
  const getUserProfile = useCallback(async () => {
    try {
      const data = await apiRequest('/auth/me');
      if (data.user) {
        await storeUser(data.user);
      }
      return data.user;
    } catch (e) {
      // If unauthorized, try to refresh token
      if (e.message.includes('Unauthorized') || e.message.includes('expired')) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          return getUserProfile();
        }
        await clearAuthData();
      }
      throw e;
    }
  }, [tokens.accessToken]);

  /**
   * Check if user has a specific role
   */
  const hasRole = useCallback((role) => {
    if (!user?.roles) return false;
    return user.roles.includes(role);
  }, [user]);

  /**
   * Check if user has any of the specified roles
   */
  const hasAnyRole = useCallback((roles) => {
    if (!user?.roles) return false;
    return roles.some(role => user.roles.includes(role));
  }, [user]);

  const value = {
    // State
    user,
    isLoading,
    isAuthenticated,
    error,
    tokens,

    // Actions
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    getUserProfile,
    refreshAccessToken,

    // Helpers
    hasRole,
    hasAnyRole,
    clearError: () => setError(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
