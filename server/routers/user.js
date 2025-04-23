const { Router } = require("express");

const userController = require("../controllers/user.js");

const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/leaderboard", userController.getTopScores);
userRouter.get("/score/:id", userController.getUserScore);
userRouter.patch("/score/:id", userController.updateUserScore);

module.exports = userRouter;
