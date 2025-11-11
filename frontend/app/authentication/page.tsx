const AuthPage = () => {
  return (
    <div>
      <h1>Authentication</h1>
      <fieldset className="fieldset w-fit">
        <legend className="fieldset-legend">Sign In</legend>

        <label className="label">Username</label>
        <input
          type="text"
          className="input"
          placeholder="example@example.com"
        />

        <label className="label">Password</label>
        <input type="text" className="input" placeholder="●●●●●●●●" />

        <button className="btn btn-neutral mt-4">Login</button>
      </fieldset>
    </div>
  );
};

export default AuthPage;
