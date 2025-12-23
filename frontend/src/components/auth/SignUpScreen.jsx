import React, { useState, useEffect } from "react";
import "./Signuppage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../redux/action/globalAction";

function SignupScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔹 Local state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  // 🔹 Redux state
   const { loading, user, error } = useSelector(
      (state) => state.userAuth
    );
  // 🔹 Submit handler
  const handleSignup = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
      role,
    };

    dispatch(userRegister(userData));
  };

  //ROLE BASED REDIRECT AFTER SIGNUP
 useEffect(() => {
     if (user?.role === "admin") {
       navigate("/admin");
     } else if (user?.role === "user") {
       navigate("/user");
     }
   }, [user, navigate]);

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create Account ✨</h2>
        <p className="signup-subtitle">
          Join us and get started today
        </p>

        <form className="signup-form" onSubmit={handleSignup}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Role */}
          <div className="input-group">
            <label>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Error */}
          {error && <p className="error-text">{error}</p>}

          <button className="signup-btn" type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p className="signup-footer">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupScreen;
