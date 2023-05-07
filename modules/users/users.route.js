const router = require("express").Router;
const {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("./users.controller");
const authRequired = require("../middleware/authRequired");

const userRouter = router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updateUserById);
userRouter.delete("/:id", deleteUserById);

module.exports = userRouter;
