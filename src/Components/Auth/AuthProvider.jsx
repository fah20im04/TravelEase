
import React, { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../Firebase/Firebase.init";
import { AuthContext } from "./AuthContext";
import LoadingSpinner from "../Pages/Loading/LoadingSpinner";
import axiosInstance from "../../Api/axiosInstance";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---------------- Create user ----------------
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ---------------- Login ----------------
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await getJWT(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Google login ----------------
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await getJWT(result.user);
      return result;
    } catch (err) {
      console.error("Google login failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Update profile ----------------
  const updateUserProfile = (name, photoURL) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, { displayName: name, photoURL });
    }
    return Promise.reject("No current user");
  };

  // ---------------- Logout ----------------
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem("accessToken");
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Get JWT from backend ----------------
  const getJWT = async (firebaseUser) => {
    if (!firebaseUser?.email) throw new Error("Firebase user has no email");
    try {
      const res = await axiosInstance.post("/login", { email: firebaseUser.email });
      if (!res.data?.token) throw new Error("No token returned from server");
      localStorage.setItem("accessToken", res.data.token);
      setUser(firebaseUser);
    } catch (err) {
      console.error("Failed to get JWT:", err);
      throw err;
    }
  };

  // ---------------- Observe auth state ----------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      try {
        if (currentUser) {
          await getJWT(currentUser);
        } else {
          localStorage.removeItem("accessToken");
          setUser(null);
        }
      } catch (err) {
        console.error("Auth state error:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // ---------------- Context value ----------------
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    updateUserProfile,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
