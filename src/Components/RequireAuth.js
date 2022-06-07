import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
const RequireAuth = ({ children }) => {
  const { token } = useAuth();
  const res = localStorage.getItem("token");
  const location = useLocation();

  console.log("auth ran");

  return res || token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
