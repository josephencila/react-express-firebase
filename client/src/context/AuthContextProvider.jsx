import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
} from "firebase/auth";

import { app, auth } from "../config/firebaseConfig";
import { Outlet, useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const email = "bbqa2.supabase@gmail.com";
  const password = "aweawe@Awe213";
  
  const navigate = useNavigate()

  const signUp = async () => {
    setLoading(true);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await sendEmailVerification(response?.user);

      return toast.success("Account created successfully.");
    } catch (error) {
      let errorMessage = "";
      switch (error.code) {
        case "auth/missing-email":
          errorMessage = `Email is required.`;
          break;
        case "auth/email-already-in-use":
          errorMessage = `Failed to sign-up: A user with this email already exists`;
          break;
        case "auth/invalid-email":
          errorMessage = `Email must be a valid email address.`;
          break;
        case "auth/operation-not-allowed":
          errorMessage = `Error during sign up.`;
          break;
        case "auth/missing-password":
          errorMessage = "Password is required.";
          break;
        case "auth/weak-password":
          errorMessage = "Password is weak.";
          break;
        default:
          errorMessage = error.message;
          break;
      }

      return toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      return toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await auth.signOut();
    } catch (error) {
      return toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resendEmailVerification = async () => {
    try {
      await sendEmailVerification(authUser);
      return toast.success("Account created successfully.");
    } catch (error) {
      return toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && !user.emailVerified) {
        navigate('/verify')
      }
      console.log(user?.accessToken);
      setAuthUser(user);
      setIsAuth(user ? true : false);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        resendEmailVerification,
        authUser,
        isAuth,
        setIsAuth,
        loading,
        success,
      }}
    >
      {children}
      {loading ? <span>loading...</span> : <Outlet />}
    </AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContext;
