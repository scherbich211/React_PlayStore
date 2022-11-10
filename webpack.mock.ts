/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
import nodePath from "path";
import { IUser, usersJSON, gamesJSON, IGameData } from "@/types/mockStore";
import express from "express";

export default webpackMockServer.add((app, helper) => {
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
    setTimeout(next, helper.getRandomInt(0, 500));
  });

  app.get("/getTopProducts", (_req, res) => {
    res.status(200).json(contentGames.games.slice(0, 3));
  });
  app.get("/getAllProducts", (_req, res) => {
    res.status(200).json(contentGames.games);
  });

  app.get("/getScreenProducts/:screen/:text", (req, res) => {
    const { screen, text } = req.params as { screen: "Playstation 5" | "PC" | "XBox One"; text: string };
    const data = contentGames.games.filter((el) => el.permission.indexOf(screen) !== -1);
    if (text === "empty") {
      res.status(200).json(data);
    } else {
      const filteredByName = data.filter((el) => el.name.toLowerCase().startsWith(text.toLowerCase()));
      res.status(200).json(filteredByName);
    }
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
        balance: "0",
      };
      contentUsers.users = [...contentUsers.users, newUser];
      contentUsers.authorized = newUser.id;
      fs.writeFileSync("./dataJSON/users.json", JSON.stringify(contentUsers, null, 2));
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
        fs.writeFileSync("./dataJSON/users.json", JSON.stringify(contentUsers, null, 2));
        res.status(201).json(dataUser[0]);
      } else {
        res.status(400).send({ message: `Wrong login or username` });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: `Server error` });
    }
  });
  app.post("/product", (req, res) => {
    try {
      const pidor = req.body as IGameData;
      const newData: IGameData = {
        ...pidor,
        id: contentGames.games.length,
      };
      if (newData) {
        contentGames.games = [...contentGames.games, newData];
        fs.writeFileSync("./dataJSON/games.json", JSON.stringify(contentGames, null, 2));
        res.status(201).json(newData);
      } else {
        res.status(400).send({ message: `Wrong login or username` });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: `Server error` });
    }
  });
  app.put("/product", (req, res) => {
    try {
      const pidor = req.body as IGameData;
      const findGame = contentGames.games.filter((el) => el.id === pidor.id)[0];
      const updateGame: IGameData = {
        ...pidor,
        id: findGame.id,
      };
      contentGames.games[findGame.id] = updateGame;
      fs.writeFileSync("./dataJSON/games.json", JSON.stringify(contentGames, null, 2));
      res.status(200).json(updateGame);
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: `Server error` });
    }
  });
  app.delete("/product/:id", (req, res) => {
    try {
      const { id } = req.params;
      const filteredArr = contentGames.games.filter((el) => el.id !== Number(id));
      contentGames.games = filteredArr;
      fs.writeFileSync("./dataJSON/games.json", JSON.stringify(contentGames, null, 2));
      res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: `Server error` });
    }
  });
  app.post("/auth/logOut", (_req, res) => {
    try {
      contentUsers.authorized = -1;
      fs.writeFileSync("./dataJSON/users.json", JSON.stringify(contentUsers, null, 2));
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
      const { login, description, profileImage, balance } = req.body as IUser;
      const dataUser = contentUsers.users.filter((el) => el.id === contentUsers.authorized)[0];
      const updateUser: IUser = {
        id: dataUser.id,
        login,
        password: dataUser.password,
        description,
        profileImage,
        balance,
      };
      contentUsers.users[contentUsers.authorized] = updateUser;
      fs.writeFileSync("./dataJSON/users.json", JSON.stringify(contentUsers, null, 2));
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
      fs.writeFileSync("./dataJSON/users.json", JSON.stringify(contentUsers, null, 2));
      res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: `Server error` });
    }
  });
});
