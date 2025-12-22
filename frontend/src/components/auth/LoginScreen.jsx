import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/action/globalAction";

function LoginScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, user, error } = useSelector(
    (state) => state.userAuth
  );

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(
      userLogin({
        email,
        password,
      })
    );
  };
console.log("user", user)
  // ROLE BASED NAVIGATION
  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else if (user?.role === "user") {
      navigate("/user");
    }
  }, [user, navigate]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="login-footer">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")}>
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
