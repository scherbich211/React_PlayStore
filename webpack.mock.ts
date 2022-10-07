/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
import nodePath from "path";
import { IUser, responceJSON } from "@/types/mockStore";
import express from "express";

export default webpackMockServer.add((app) => {
  // it resolves body
  const bodyParser = require("body-parser");
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.use(express.json());

  const resolvedPath = require.resolve(nodePath.join(__dirname, "./response.json"));
  delete require.cache[resolvedPath];

  const fs = require("fs");
  const content: responceJSON = JSON.parse(fs.readFileSync("response.json", "utf8"));

  app.get("/getTopProducts", (_req, res) => {
    res.status(200).json(content.games);
  });
  app.get("/search/:text", (req, res) => {
    const { text } = req.params;
    const { games } = content;
    const filteredArr = games.filter((el) => el.name.toLowerCase().startsWith(text.toLowerCase()));
    res.status(200).json(filteredArr);
  });
  app.put("/auth/signUp", (req, res) => {
    try {
      const { login, password } = req.body as IUser;
      const newUser: IUser = {
        id: content.users.length,
        login,
        password,
        description: "",
        profileImage: "",
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
      res.status(200).json();
    } catch (error) {
      res.status(400).send({ message: `Server error` });
    }
  });
  app.get("/auth", (_req, res) => {
    res.status(200).json(content.authorized !== -1);
  });
  app.get("/getProfile", (_req, res) => {
    setTimeout(() => {
      res.status(200).json(content.users.filter((el) => el.id === content.authorized)[0]);
    }, 1000);
  });
  app.post("/saveProfile", (req, res) => {
    try {
      const { login, description, profileImage } = req.body as IUser;
      const dataUser = content.users.filter((el) => el.id === content.authorized)[0];
      const updateUser: IUser = {
        id: dataUser.id,
        login,
        password: dataUser.password,
        description,
        profileImage,
      };
      content.users[content.authorized] = updateUser;
      fs.writeFileSync("response.json", JSON.stringify(content, null, 2));
      res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: `Server error` });
    }
  });
  app.post("/changePassword", (req, res) => {
    try {
      const { password } = req.body as { password: string };
      const dataUser = content.users.filter((el) => el.id === content.authorized)[0];
      content.users[content.authorized] = { ...dataUser, password };
      fs.writeFileSync("response.json", JSON.stringify(content, null, 2));
      res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: `Server error` });
    }
  });
});
