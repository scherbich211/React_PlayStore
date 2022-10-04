import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { changeModalActive, changeModalType } from "../../redux/reducers/modal";
import { Route } from "../../utils/routing";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isSignedIn } = useAppSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useAppDispatch();

  if (isSignedIn === false) {
    dispatch(changeModalActive(true));
    dispatch(changeModalType("signIn"));
    return <Navigate to={Route.Home} replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
