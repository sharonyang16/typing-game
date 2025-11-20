"use client";
import Link from "next/link";
import { CircleAlert } from "lucide-react";
import useAuthPage from "@/hooks/useAuthPage";

const LoginPage = () => {
  const { username, setUsername, password, setPassword, handleLogin, error } =
    useAuthPage();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Login</h1>
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
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="●●●●●●●●"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button className="btn btn-primary mt-4" onClick={handleLogin}>
          Login
        </button>
      </fieldset>

      <div className="text-xs">
        Don&apos;t have an account? Sign up{" "}
        <Link href="/authentication/sign-up" className="link">
          here
        </Link>
        !
      </div>
    </div>
  );
};

export default LoginPage;
