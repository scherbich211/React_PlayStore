/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
import nodePath from "path";
import { IGamesData } from "@/types/user";

export default webpackMockServer.add((app) => {
  const resolvedPath = require.resolve(nodePath.join(__dirname, "./response.json"));
  delete require.cache[resolvedPath];
  const data: IGamesData = require(resolvedPath);
  app.get("/getTopProducts", (_req, res) => {
    res.json(data);
  });
  app.get("/search/:text", (req, res) => {
    const { text } = req.params;
    const filteredArr = data.games.filter((el) => el.name.toLowerCase().startsWith(text.toLowerCase()));
    res.json(filteredArr);
  });
});
