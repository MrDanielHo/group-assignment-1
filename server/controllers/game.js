const Game = require("../models/Game");
const Question = require("../models/Question");

async function getAllGames(req, res) {
  try {
    const games = await Game.getAllGames();
    res.status(200).json(games);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getAllQuestionsByGame(req, res) {
  try {
    const gameId = req.params.gameId;
    const questions = await Game.getAllQuestionsByGame(gameId);
    res.status(200).json(questions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getAllResources(req, res) {
  try {
      const resourceLinksArr = await Game.getAllResourceUrls();
      res.status(200).json(resourceLinksArr);
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
}

// Not being used - Answer checking logic on the frontend
// async function checkAnswer(req, res) {
//   try {
//     const { questionId, answer } = req.body;
//     const question = await Question.getOneById(questionId);
//     if (question.answer === answer) {
//       res.status(200).json({ correct: true });
//     } else {
//       res.status(200).json({ correct: false });
//     }
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// }

module.exports = {
  getAllGames,
  getAllQuestionsByGame,
  getAllResources,
  // checkAnswer,
};
