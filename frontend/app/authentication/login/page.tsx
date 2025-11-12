"use client";
import Link from "next/link";
import useAuthPage from "@/hooks/useAuthPage";

const LoginPage = () => {
  const { username, setUsername, password, setPassword, handleLogin } =
    useAuthPage();

  return (
    <div>
      <fieldset className="fieldset w-fit">
        <legend className="fieldset-legend">Login</legend>

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

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
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
