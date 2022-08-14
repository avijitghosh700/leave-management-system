import React from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

import { auth } from "../firebase.config";

import authAdapter, { Auth } from "../models/auth.model";

const useFirebaseAuth = () => {
  const [user, setUser] = React.useState<Auth | null>(null);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [signInLoading, setSignInLoadingLoading] = React.useState<boolean>(false);
  const [signUpLoading, setSignUpLoadingLoading] = React.useState<boolean>(false);
  const [googleAuthLoading, setGoogleAuthLoadingLoading] = React.useState<boolean>(false);

  const authStateChanged = async (authState: any) => {
    setLoading(true)

    if (!authState) {
      setUser(null)
      setLoading(false)
      return;
    }

    try {
      const accessToken: string = await authState.getIdToken();

      accessToken && setUser(() => authAdapter(authState, accessToken));
      setLoading(false);
    } catch (error) {
      setUser(null);
      setLoading(false);
    }
  }

  const signUpWithPassword = async ({ email, password }: Record<string, string>) => {
    setLoading(true);
    setSignUpLoadingLoading(true);

    try {
      const authUser = await createUserWithEmailAndPassword(auth, email, password)
      const accessToken: string = authUser && await authUser.user.getIdToken();

      accessToken && setUser(() => authAdapter(authUser.user, accessToken));
      setLoading(false);
      setSignUpLoadingLoading(false);
    } catch (error) {
      setUser(null);
      setLoading(false);
      setSignUpLoadingLoading(false);
    }
  }

  const signInWithPassword = async ({ email, password }: Record<string, string>) => {
    setLoading(true);
    setSignInLoadingLoading(true);

    try {
      const authUser = await signInWithEmailAndPassword(auth, email, password)
      const accessToken: string = authUser && await authUser.user.getIdToken();

      accessToken && setUser(() => authAdapter(authUser.user, accessToken));
      setLoading(false);
      setSignInLoadingLoading(false);
    } catch (error) {
      setUser(null);
      setLoading(false);
      setSignInLoadingLoading(false);
    }
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    setLoading(true);
    setGoogleAuthLoadingLoading(true);

    try {
      const authUser = await signInWithPopup(auth, provider);
      const accessToken: string = authUser && await authUser.user.getIdToken();

      accessToken && setUser(() => authAdapter(authUser.user, accessToken));
      setLoading(false);
      setGoogleAuthLoadingLoading(false);
    } catch (error) {
      setUser(null);
      setLoading(false);
      setGoogleAuthLoadingLoading(false);
    }
  }

  const logout = () => signOut(auth);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signInLoading,
    signUpLoading,
    googleAuthLoading,
    signUpWithPassword,
    signInWithPassword,
    signInWithGoogle,
    logout
  };
}

export default useFirebaseAuth;