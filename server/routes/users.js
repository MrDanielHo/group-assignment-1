const { Router } = require('express');
const userRouter = Router();
const userController = require('../controllers/users');

userRouter.get("/", userController.index);
userRouter.get("/:id", userController.show);
userRouter.post("/", userController.create);
// userRouter.get("/top", userController.getTopScore);
userRouter.patch("/:id", userController.updateName);
userRouter.patch("/:id", userController.updatePassword);
userRouter.delete("/:id", userController.destroy);

module.exports = userRouter;