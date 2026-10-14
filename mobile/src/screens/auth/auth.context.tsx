import {
  createUserWithEmailAndPassword,
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from '@react-native-firebase/auth';
import { getMessaging, getToken } from '@react-native-firebase/messaging';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';

import apiClient from '@/api/api-client';

type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
  initializing: boolean;
  error: unknown | null;
  signUp: (email: string, password: string) => Promise<FirebaseAuthTypes.User>;
  signIn: (email: string, password: string) => Promise<FirebaseAuthTypes.User>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), async currentUser => {
      setUser(currentUser);

      if (currentUser) {
        try {
          await apiClient.get('/auth/sync');
        } catch (syncError) {
          console.error('Backend profile sync failed, logging out:', syncError);
          try {
            await firebaseSignOut(getAuth());
            setUser(null);
          } catch (signOutError) {
            console.error('Sign out failed:', signOutError);
          }
        }
      }

      setInitializing(false);
    });

    return subscriber;
  }, []);

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password,
      );
      return userCredential.user;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password,
      );
      return userCredential.user;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    const m = getMessaging();
    if (Platform.OS === 'ios') {
      await m.registerDeviceForRemoteMessages();
    }
    const token = await getToken(m);

    if (token) {
      await apiClient.post('/auth/logout', { token });
    }

    try {
      await firebaseSignOut(getAuth());
      setUser(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, initializing, error, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
