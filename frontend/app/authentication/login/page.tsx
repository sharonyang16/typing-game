"use client";
import Link from "next/link";
import useAuthPage from "@/hooks/useAuthPage";
import Banner from "@/components/banner/banner";

const LoginPage = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
    error,
    loading,
  } = useAuthPage();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Login</h1>
      {error && <Banner message={error} type="error" />}
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

        <button
          className="btn btn-primary mt-4"
          onClick={handleLogin}
          disabled={loading || !username || !password}
        >
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
