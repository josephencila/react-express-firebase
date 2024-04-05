import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../config/firebaseConfig";
import { Outlet, useNavigate } from "react-router-dom";
import PageSpinner from "../component/spinner/PageSpinner";

const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(true);
  const navigate = useNavigate();

  const signUp = async (fullname, email, password) => {
    setLoading(true);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(response?.user, {
        displayName: fullname,
      });
      
      await sendEmailVerification(response?.user);
    } catch (error) {
      let errorMessage = "";
      switch (error.code) {
        case "auth/missing-email":
          errorMessage = `Email is required.`;
          break;
        case "auth/invalid-email":
          errorMessage = `Email must be a valid email address.`;
          break;
        case "auth/missing-password":
          errorMessage = "Password is required.";
          break;
        case "auth/weak-password":
          errorMessage = "Password is weak.";
          break;
        case "auth/email-already-in-use":
          errorMessage = `Failed to sign-up: A user with this email already exists`;
          break;
        case "auth/operation-not-allowed":
          errorMessage = `Failed to sign-up: Internal error occured.`;
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

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      let errorMessage = "";
      switch (error.code) {
        case "auth/invalid-credential":
          errorMessage = "Failed to sign-in: Invalid Credentials.";
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

  const signOut = async () => {
    setLoading(true);
    try {
      await auth.signOut();
      navigate("/sign-in");
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
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && !user.emailVerified) {
        navigate("/verify");
      }
      // console.log(user?.accessToken)
      setIsAuth(user ? true : false);
      setAuthUser(user);
      setSpinner(false);
    });

    return unsubscribe;
  }, [navigate]);

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
      }}
    >
      {children}

      {spinner ? <PageSpinner /> : <Outlet />}
    </AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContext;
