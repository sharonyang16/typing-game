"use client";
import { useAuthContext } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { useState } from "react";

/**
 * Custom hook for the authentication pages.
 * @returns username - the username value
 * @returns setUsername - the function to set the username value
 * @returns password - the password value
 * @returns setPassword - the function to set the password value
 * @returns confirmPassword - the confirm password value
 * @returns setConfirmPassword - the function to set the confirm password value
 * @returns error - the error message related to attempted login or sign up
 * @returns loading - if the login or sign up is in progress
 * @returns staySignedIn - if the user wants to be signed in on next login
 * @returns setStaySignedIn - the function to set the stay signed in state
 * @returns handleLogin - the function to handle login
 * @returns handleSignUp - the function to handle sign up
 */
const useAuthPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [staySignedIn, setStaySignedIn] = useState(false);

  const { login, signUp, user } = useAuthContext();

  // Redirects to the profile page if there's a user
  if (user) {
    redirect("/profile");
  }

  /**
   * Handles login.
   * @returns A Promise that resolves to void.
   */
  const handleLogin = async (): Promise<void> => {
    try {
      setLoading(true);
      await login({ email: username, password, staySignedIn });
      redirect("/");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
    setLoading(false);
  };

  /**
   * Handles sign up.
   * @returns A Promise that resolves to void.
   */
  const handleSignUp = async (): Promise<void> => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await signUp({ email: username, password, staySignedIn });
      redirect("/");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
    setLoading(false);
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    staySignedIn,
    setStaySignedIn,
    handleLogin,
    handleSignUp,
  };
};

export default useAuthPage;
