import Link from "next/link";

const AuthPage = () => {
  return (
    <div>
      <fieldset className="fieldset w-fit">
        <legend className="fieldset-legend">Sign Up</legend>

        <label className="label">Username</label>
        <input
          type="text"
          className="input"
          placeholder="example@example.com"
        />

        <label className="label">Password</label>
        <input type="text" className="input" placeholder="●●●●●●●●" />

        <label className="label">Confirm Password</label>
        <input type="text" className="input" placeholder="●●●●●●●●" />

        <button className="btn btn-neutral mt-4">Sign Up</button>
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

export default AuthPage;
