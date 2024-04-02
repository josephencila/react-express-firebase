import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const PrivateRoute = () => {
  const { isAuth } = useAuth();
  const location = useLocation();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
