"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useAuthPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, signUp } = useAuthContext();

  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login({ email: username, password });
      router.push("/");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
    setLoading(false);
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await signUp({ email: username, password });
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
    handleLogin,
    handleSignUp,
  };
};

export default useAuthPage;
