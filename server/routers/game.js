const { Router } = require("express");

const gameController = require("../controllers/game.js");

const gameRouter = Router();

gameRouter.get("/", gameController.getAllGames);
gameRouter.get("/:gameId/questions", gameController.getAllQuestionsByGame);

module.exports = gameRouter;
