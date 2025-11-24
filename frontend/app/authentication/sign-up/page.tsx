"use client";
import Link from "next/link";
import { CircleAlert } from "lucide-react";
import useAuthPage from "@/hooks/useAuthPage";

const SignUpPage = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSignUp,
    error,
    loading,
  } = useAuthPage();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Sign Up</h1>
      {error && (
        <div
          role="alert"
          className="alert alert-error alert-vertical sm:alert-horizontal flex gap-2"
        >
          <CircleAlert />
          <div>{error}</div>
        </div>
      )}
      <fieldset className="fieldset w-fit">
        <label className="label">Username</label>
        <input
          type="text"
          className="input"
          placeholder="example@example.com"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          disabled={loading}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="●●●●●●●●"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          disabled={loading}
        />

        <label className="label">Confirm Password</label>
        <input
          type="password"
          className="input"
          placeholder="●●●●●●●●"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          disabled={loading}
        />

        <button
          className="btn btn-primary mt-4"
          onClick={handleSignUp}
          disabled={loading || !username || !password || !confirmPassword}
        >
          Sign Up
        </button>
      </fieldset>

      <div className="text-xs">
        Already have an account? Login{" "}
        <Link href="/authentication/login" className="link">
          here
        </Link>
        !
      </div>
    </div>
  );
};

export default SignUpPage;
