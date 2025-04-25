const express = require("express");
const cors = require("cors");

const logRoutes = require("./middleware/logger");
const userRouter = require("./routers/user");
const gameRouter = require("./routers/game");


const api = express();

api.use(cors());
api.use(express.json());
api.use(logRoutes);

api.get("/", (req, res) => {
  res.json({
    name: "Geo Quiz API",
    description: "A simple API for a quiz game about geography.",
  });
});

api.use("/users", userRouter);
api.use("/games", gameRouter);


module.exports = api;
