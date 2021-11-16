const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const UsersRouter = require("./users/users-router");
const ClassesRouter = require("./classes/classes-router");
const authRouter = require("./auth/auth-router");
const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/users", UsersRouter);
server.use("/api/classes", ClassesRouter);
server.use("/api/auth", authRouter);

server.get("/", async (req, res) => {
  res.json("Welcome to Anywhere Fitness API");
});

server.use("*", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
