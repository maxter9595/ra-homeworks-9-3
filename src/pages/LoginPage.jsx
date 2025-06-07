import { useState } from "react";
import { login, fetchProfile } from "../api/api";
import { saveToken, saveProfile } from "../auth";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [loginVal, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login(loginVal, password);
      saveToken(token);
      const profile = await fetchProfile();
      saveProfile(profile);
      navigate("/news");
    } catch (error) {
      console.error(error);
      setError("Invalid login or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h1 className="login-title">Welcome Back</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login" className="form-label">Username</label>
            <input
              id="login"
              type="text"
              className="form-input"
              placeholder="Enter your username"
              value={loginVal}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn" style={{ width: '100%' }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
