const game = require("../models/Game");
const Question = require("../models/Question");

async function getAllGames(req, res) {
  try {
    const games = await game.getAllGames();
    res.status(200).json(games);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getAllQuestionsByGame(req, res) {
  try {
    const gameId = req.params.gameId;
    const questions = await game.getAllQuestionsByGame(gameId);
    res.status(200).json(questions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function checkAnswer(req, res) {
  try {
    const { questionId, answer } = req.body;
    const question = await Question.getOneById(questionId);
    if (question.answer === answer) {
      res.status(200).json({ correct: true });
    } else {
      res.status(200).json({ correct: false });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getAllGames,
  getAllQuestionsByGame,
  checkAnswer,
};
