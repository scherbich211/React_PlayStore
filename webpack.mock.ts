/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
import nodePath from "path";
import { IUser, responceJSON } from "@/types/mockStore";

export default webpackMockServer.add((app) => {
  // it resolves body
  const bodyParser = require("body-parser");
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const resolvedPath = require.resolve(nodePath.join(__dirname, "./response.json"));
  delete require.cache[resolvedPath];

  const fs = require("fs");
  const content: responceJSON = JSON.parse(fs.readFileSync("response.json", "utf8"));

  app.get("/getTopProducts", (_req, res) => {
    res.json(content.games);
  });
  app.get("/search/:text", (req, res) => {
    const { text } = req.params;
    const { games } = content;
    const filteredArr = games.filter((el) => el.name.toLowerCase().startsWith(text.toLowerCase()));
    res.json(filteredArr);
  });
  app.put("/auth/signUp", (req, res) => {
    try {
      const { login, password } = req.body as IUser;
      const newUser = {
        id: content.users.length,
        login,
        password,
      };
      content.users = [...content.users, newUser];
      content.authorized = newUser.id;
      fs.writeFileSync("response.json", JSON.stringify(content, null, 2));
      res.status(200).json(newUser);
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: `Server error` });
    }
  });
  app.post("/auth/signIn", (req, res) => {
    try {
      const { login, password } = req.body as IUser;
      const dataUser = content.users.filter((el) => el.login === login && el.password === password);
      if (dataUser.length > 0) {
        content.authorized = dataUser[0].id;
        fs.writeFileSync("response.json", JSON.stringify(content, null, 2));
        res.status(201).json(dataUser[0]);
      } else {
        res.status(400).send({ message: `Wrong login or username` });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: `Server error` });
    }
  });
  app.post("/auth/logOut", (_req, res) => {
    try {
      content.authorized = -1;
      fs.writeFileSync("response.json", JSON.stringify(content, null, 2));
      res.status(200);
    } catch (error) {
      res.status(400).send({ message: `Server error` });
    }
  });
  app.get("/auth", (_req, res) => {
    res.json(content.authorized !== -1);
  });
  app.get("/auth/user", (_req, res) => {
    res.json(content.users.filter((el) => el.id === content.authorized)[0]);
  });
});
