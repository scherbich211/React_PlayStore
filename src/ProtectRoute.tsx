import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { Route } from "./utils/routing";

const ProtectedRoute = ({ children, redirectToLogin }: { children: JSX.Element; redirectToLogin: () => void }) => {
  const { authorized } = useAuth();
  const location = useLocation();

  if (authorized === false) {
    redirectToLogin();
    return <Navigate to={Route.Home} replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
