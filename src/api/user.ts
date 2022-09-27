import { IGameData, IGamesData } from "@/types/user";
import { useRequestMutation, useRequestQuery } from "./axiosHooks";

const useGetGamesMutation = () => useRequestQuery<IGamesData, string>({ url: "getTopProducts/", method: "get" });

const useSearchMutation = () =>
  useRequestMutation<Array<IGameData>, string>({
    query: (data) => ({
      url: `search/${data}`,
      method: "get",
    }),
  });

// eslint-disable-next-line import/prefer-default-export
export { useGetGamesMutation, useSearchMutation };
