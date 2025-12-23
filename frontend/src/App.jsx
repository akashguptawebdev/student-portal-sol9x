import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginScreen from "./components/auth/LoginScreen";
import SignupScreen from "./components/auth/SignUpScreen";
import AdminScreen from "./components/admin/AdminScreen";
import StudentScreen from "./components/student/StudentScreen";
import Layout from "./components/layout/Layout";

/* =======================
   Protected Route Wrapper
======================= */
const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Routes>
      {/* Root Route */}
      <Route
        path="/"
        element={
          user ? (
            <Navigate
              to={user.role === "admin" ? "/admin" : "/user"}
              replace
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Auth Routes */}
      <Route
        path="/login"
        element={
          user ? (
            <Navigate
              to={user.role === "admin" ? "/admin" : "/user"}
              replace
            />
          ) : (
            <LoginScreen />
          )
        }
      />

      <Route path="/signup" element={<SignupScreen />} />

      {/* Admin Route */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <Layout>
              <AdminScreen />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* User Route */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="user">
            <Layout>
              <StudentScreen />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
