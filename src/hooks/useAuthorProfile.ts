import { useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function useUserProfile() {
  const { user } = useAuth();

  const ensureUserProfile = useCallback(async () => {
    if (!user) {
      throw new Error('User must be authenticated');
    }

    try {
      const token = await user.getIdToken();
      const response = await fetch('/api/users/ensure-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to ensure user profile');
      }

      const result = await response.json();
      return result.user;
    } catch (error) {
      console.error('Error ensuring user profile:', error);
      throw error;
    }
  }, [user]);

  return {
    ensureUserProfile,
    isAuthenticated: !!user,
  };
}
