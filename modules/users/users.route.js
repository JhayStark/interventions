const router = require("express").Router;
const {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("./users.controller");
const verifyToken = require("../middleware/verifyToken");

const userRouter = router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updateUserById);
userRouter.delete("/:id", deleteUserById);

module.exports = userRouter;
