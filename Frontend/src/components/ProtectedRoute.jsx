import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  // Still checking auth
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      Checking authentication...
    </div>;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role-based protection (optional)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/pagenotfound" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
