import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginScreen from "./components/auth/LoginScreen";
import SignupScreen from "./components/auth/SignUpScreen";
import AdminScreen from "./components/admin/AdminScreen";
import StudentScreen from "./components/student/StudentScreen";
import Layout from "./components/layout/Layout";

function App() {
  
  


  return (
    <Routes>
      {/* Default */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth */}
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignupScreen />} />

      {/* Role based screens wrapped with Layout */}
      <Route
        path="/admin"
        element={
          <Layout>
            <AdminScreen />
          </Layout>
        }
      />
      <Route
        path="/user"
        element={
          <Layout>
            <StudentScreen />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
