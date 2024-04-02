import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const VerificationRoute = () => {
  const { isAuth, authUser } = useAuth();
  const location = useLocation();
  return isAuth && !authUser?.emailVerified ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default VerificationRoute;
