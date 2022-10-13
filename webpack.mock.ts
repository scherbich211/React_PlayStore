/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
import nodePath from "path";
import { IUser, usersJSON, gamesJSON } from "@/types/mockStore";
import express from "express";

export default webpackMockServer.add((app) => {
  // it resolves body
  const bodyParser = require("body-parser");

  // gives 50mb limit of req for images
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.use(express.json());

  // from docs of API
  const usersPath = require.resolve(nodePath.join(__dirname, "./dataJSON/users.json"));
  const gamesPath = require.resolve(nodePath.join(__dirname, "./dataJSON/games.json"));
  delete require.cache[usersPath];
  delete require.cache[gamesPath];

  // read content
  const fs = require("fs");
  const contentUsers: usersJSON = JSON.parse(fs.readFileSync("./dataJSON/users.json", "utf8"));
  const contentGames: gamesJSON = JSON.parse(fs.readFileSync("./dataJSON/games.json", "utf8"));

  // fake delay
  app.use((_req, _res, next) => {
    setTimeout(next, 1000);
  });

  app.get("/getTopProducts", (_req, res) => {
    res.status(200).json(contentGames.games);
  });
  app.get("/search/:text", (req, res) => {
    const { text } = req.params;
    const { games } = contentGames;
    const filteredArr = games.filter((el) => el.name.toLowerCase().startsWith(text.toLowerCase()));
    res.status(200).json(filteredArr);
  });

  app.put("/auth/signUp", (req, res) => {
    try {
      const { login, password } = req.body as IUser;
      const newUser: IUser = {
        id: contentUsers.users.length,
        login,
        password,
        description: "",
        profileImage: "",
      };
      contentUsers.users = [...contentUsers.users, newUser];
      contentUsers.authorized = newUser.id;
      fs.writeFileSync("response.json", JSON.stringify(contentUsers, null, 2));
      res.status(200).json(newUser);
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: `Server error` });
    }
  });
  app.post("/auth/signIn", (req, res) => {
    try {
      const { login, password } = req.body as IUser;
      const dataUser = contentUsers.users.filter((el) => el.login === login && el.password === password);
      if (dataUser.length > 0) {
        contentUsers.authorized = dataUser[0].id;
        fs.writeFileSync("response.json", JSON.stringify(contentUsers, null, 2));
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
      contentUsers.authorized = -1;
      fs.writeFileSync("response.json", JSON.stringify(contentUsers, null, 2));
      res.status(200).json();
    } catch (error) {
      res.status(400).send({ message: `Server error` });
    }
  });
  app.get("/auth", (_req, res) => {
    res.status(200).json(contentUsers.authorized !== -1);
  });
  app.get("/getProfile", (_req, res) => {
    res.status(200).json(contentUsers.users.filter((el) => el.id === contentUsers.authorized)[0]);
  });
  app.post("/saveProfile", (req, res) => {
    try {
      const { login, description, profileImage } = req.body as IUser;
      const dataUser = contentUsers.users.filter((el) => el.id === contentUsers.authorized)[0];
      const updateUser: IUser = {
        id: dataUser.id,
        login,
        password: dataUser.password,
        description,
        profileImage,
      };
      contentUsers.users[contentUsers.authorized] = updateUser;
      fs.writeFileSync("response.json", JSON.stringify(contentUsers, null, 2));
      res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: `Server error` });
    }
  });
  app.post("/changePassword", (req, res) => {
    try {
      const { password } = req.body as { password: string };
      const dataUser = contentUsers.users.filter((el) => el.id === contentUsers.authorized)[0];
      contentUsers.users[contentUsers.authorized] = { ...dataUser, password };
      fs.writeFileSync("response.json", JSON.stringify(contentUsers, null, 2));
      res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: `Server error` });
    }
  });
});
