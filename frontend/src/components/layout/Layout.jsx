import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, userLogout } from "../../redux/action/globalAction";
import { useNavigate } from "react-router-dom";
import "./Layout.css";
import { getMyStudentProfile } from "../../redux/action/studentAction";
import { adminGetAllStudents } from "../../redux/action/adminAction";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, user, error } = useSelector(
    (state) => state.userAuth
  );

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("userAuth");

    // Reset Redux state
    dispatch(userLogout());

    // Navigate to login page without reloading
    navigate("/login");
  };

  const handleRfresh = () => {
    if (user?.role === "admin") {
        dispatch(adminGetAllStudents());
    } else {
      dispatch(getMyStudentProfile())
      dispatch(getUser())

    }

  }

  return (
    <div className="layout">
      {/* Header */}
      <header className="layout-header">
        <div className="logo">MyApp</div>
        <nav className="nav-links">
          <button className="nav-btn" onClick={() => handleRfresh()}>
            Home
          </button>
          <button className="nav-btn" onClick={() => navigate("/")}>
            About
          </button>
          <button className="nav-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      {/* Main content */}
      <main className="layout-content">{children}</main>

      {/* Footer */}
      <footer className="layout-footer">
        <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
      </footer>
    </div>
  );
}
