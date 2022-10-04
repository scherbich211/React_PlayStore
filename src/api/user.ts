import { IGameData, IUser } from "@/types/mockStore";
import { useRequestMutation, useRequestQuery } from "./axiosHooks";

const useGetGamesMutation = () => useRequestQuery<Array<IGameData>, string>({ url: "getTopProducts/", method: "get" });

const useSearchMutation = () =>
  useRequestMutation<Array<IGameData>, string>({
    query: (data) => ({
      url: `search/${data}`,
      method: "get",
    }),
  });
const useSignUpMutation = () =>
  useRequestMutation<IUser, IUser>({
    query: (body) => ({
      url: "auth/signUp/",
      method: "put",
      body,
    }),
  });
const useSignInMutation = () =>
  useRequestMutation<IUser, IUser>({
    query: (body) => ({
      url: "auth/signIn/",
      method: "post",
      body,
    }),
  });
const useIsAuthorizedQuery = () => useRequestQuery<boolean, string>({ url: "auth/", method: "get" });
const useUserQuery = () => useRequestQuery<IUser, string>({ url: "auth/user", method: "get" });

const useLogOutMutation = () =>
  useRequestMutation<string, string>({
    query: () => ({
      url: "auth/logOut/",
      method: "post",
    }),
  });

// eslint-disable-next-line import/prefer-default-export
export {
  useGetGamesMutation,
  useSearchMutation,
  useSignUpMutation,
  useSignInMutation,
  useIsAuthorizedQuery,
  useLogOutMutation,
  useUserQuery,
};
