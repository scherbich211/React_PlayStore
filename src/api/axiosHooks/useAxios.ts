import axios from "axios";

import { useRef } from "react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(axios.defaults.headers as any)["Content-Type"] = "application/json";

const useAxios = () => {
  const instance = useRef(
    axios.create({
      baseURL: "http://localhost:8079/",
    })
  );
  return instance.current;
};

export default useAxios;
