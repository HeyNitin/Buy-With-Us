import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
const RequireNoAuth = ({ children }) => {
  const { token } = useAuth();
  const res = localStorage.getItem("token");
  const location = useLocation();
  return res || token ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    children
  );
};

export default RequireNoAuth;
