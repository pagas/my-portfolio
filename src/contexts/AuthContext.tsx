"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';
import { getOrCreateUser } from '@/lib/auth/users';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Ensure user profile exists for new users
  const ensureUserProfile = async (user: User) => {
    try {
      if (!user.uid || !user.email) {
        console.warn('User data incomplete, skipping profile creation');
        return;
      }
      await getOrCreateUser(user.uid, user.email, user.displayName || undefined);
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Set authentication cookie for server-side access
        const token = await user.getIdToken();
        const isSecure = process.env.NODE_ENV === 'production';
        document.cookie = `auth-token=${token}; path=/; ${isSecure ? 'secure; ' : ''}samesite=strict`;
      } else {
        // Clear authentication cookie on logout
        document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Create user profile immediately after successful registration
    await ensureUserProfile(userCredential.user);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
