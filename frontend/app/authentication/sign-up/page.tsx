"use client";
import Link from "next/link";
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
  } = useAuthPage();
  return (
    <div>
      <h1 className="text-xl font-bold">Sign Up</h1>
      <fieldset className="fieldset w-fit">
        <label className="label">Username</label>
        <input
          type="text"
          className="input"
          placeholder="example@example.com"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="●●●●●●●●"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <label className="label">Confirm Password</label>
        <input
          type="password"
          className="input"
          placeholder="●●●●●●●●"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />

        <button className="btn btn-neutral mt-4" onClick={handleSignUp}>
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
