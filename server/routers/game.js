const { Router } = require("express");

const gameController = require("../controllers/game.js");

const gameRouter = Router();

gameRouter.get("/", gameController.getAllGames);
gameRouter.get("/:gameId/questions", gameController.getAllQuestionsByGame);
gameRouter.post("/:questionId/checkAnswer", gameController.checkAnswer);


module.exports = gameRouter;
