import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  signIn,
  signUp,
  signOut,
  getCurrentProfile,
} from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadProfile(currentUser) {
    if (!currentUser) {
      setProfile(null);
      return;
    }

    try {
      const profileData = await getCurrentProfile(currentUser.id);
      setProfile(profileData);
    } catch (error) {
      console.error("Failed to load profile:", error);
      setProfile(null);
    }
  }

  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      const currentUser = session?.user ?? null;

      setUser(currentUser);

      if (currentUser) {
        await loadProfile(currentUser);
      }

      setLoading(false);
    }

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;

      setUser(currentUser);

      if (currentUser) {
        await loadProfile(currentUser);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function login(email, password) {
    const data = await signIn(email, password);

    setUser(data.user);

    if (data.user) {
      await loadProfile(data.user);
    }

    return data;
  }

  async function register({
    email,
    password,
    displayName,
    role = "fan",
  }) {
    const data = await signUp({
      email,
      password,
      displayName,
      role,
    });

    return data;
  }

  async function logout() {
    await signOut();

    setUser(null);
    setProfile(null);
  }

  const value = {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    role: profile?.role ?? user?.user_metadata?.role ?? null,
    login,
    register,
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

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}