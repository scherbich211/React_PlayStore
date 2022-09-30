import React, { useState, useEffect, ReactNode, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useIsAuthorizedQuery,
  useLogOutMutation,
  useSignInMutation,
  useSignUpMutation,
  useUserQuery,
} from "./api/user";
import { IUser } from "./types/user";
import { Route } from "./utils/routing";

interface IAuthContext {
  authorized?: boolean | null;
  user?: IUser;
  onLogin?: (value: IUser) => void;
  onSingUp?: (value: IUser) => void;
  onLogout?: () => void;
}

const AuthContext = React.createContext<IAuthContext>({ authorized: false });

export const useAuth = () => React.useContext(AuthContext);

const AuthProvider = ({ children, callback }: { children: ReactNode; callback: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [user, setUser] = useState<IUser>({
    id: -1,
    login: "",
    password: "",
  });

  const { isSuccess, data } = useIsAuthorizedQuery();
  const { isSuccess: userSuccess, data: userData } = useUserQuery();
  const [clear, { isSuccess: logoOutSuccess }] = useLogOutMutation();
  const [signIn, { isSuccess: signInSucccess, data: signInData }] = useSignInMutation();
  const [signUp, { isSuccess: signUpSucccess, data: signUpData }] = useSignUpMutation();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const origin = (location.state?.from && location.state?.from?.pathname) || Route.Home;

  const handleLogOut = () => {
    clear();
    setAuthorized(false);
    setUser({
      id: -1,
      login: "",
      password: "",
    });
    navigate(Route.Home);
  };

  const handleLogin = (value: IUser) => {
    signIn(value);
  };

  const handleSignUp = (value: IUser) => {
    signUp(value);
  };

  useEffect(() => {
    if (isSuccess && data) {
      setAuthorized(data);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (userSuccess && userData) {
      setUser(userData);
    }
  }, [userSuccess, userData]);

  useEffect(() => {
    if (logoOutSuccess) {
      setAuthorized(false);
    }
  }, [logoOutSuccess]);

  useEffect(() => {
    if (signInSucccess && signInData) {
      setAuthorized(true);
      setUser(signInData);
      navigate(origin);
      callback();
    }
  }, [signInSucccess, signInData]);

  useEffect(() => {
    if (signUpSucccess && signUpData) {
      setAuthorized(true);
      setUser(signUpData);
      navigate(Route.Profile);
      callback();
    }
  }, [signUpSucccess, signUpData]);

  const memoizedResult = useMemo(
    () => ({
      authorized,
      user,
      onLogin: handleLogin,
      onSingUp: handleSignUp,
      onLogout: handleLogOut,
    }),
    [authorized, user, handleLogin, handleSignUp, handleLogOut]
  );

  return <AuthContext.Provider value={memoizedResult}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
