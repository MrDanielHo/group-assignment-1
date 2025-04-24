const { Router } = require("express");

const gameController = require("../controllers/game.js");

const gameRouter = Router();

gameRouter.get("/", gameController.getAllGames); // Get all games
gameRouter.get('/resources', gameController.getAllResources); // All resources
gameRouter.get("/:gameId/", gameController.getAllQuestionsByGame); // Get questions for 1 game

module.exports = gameRouter;
