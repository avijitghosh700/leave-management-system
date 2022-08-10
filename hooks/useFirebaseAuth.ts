import React from "react";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import { auth } from "../firebase.config";

import authAdapter, { Auth } from "../models/auth.model";

const useFirebaseAuth = () => {
  const [user, setUser] = React.useState<Auth | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

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

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    setLoading(true);

    try {
      const authUser = await signInWithPopup(auth, provider);
      const accessToken: string = authUser && await authUser.user.getIdToken();

      console.log(authUser);

      accessToken && setUser(() => authAdapter(authUser.user, accessToken));
      setLoading(false);
    } catch (error) {
      setUser(null);
      setLoading(false);
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
    signInWithGoogle,
    logout
  };
}

export default useFirebaseAuth;