const router = require("express").Router();
const {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("./users.controller");
const { authRequired } = require("../middleware/authRequired");

router.get("/", authRequired, getUsers);
router.get("/:id", authRequired, getUserById);
router.put("/:id", authRequired, updateUserById);
router.delete("/:id", authRequired, deleteUserById);

module.exports = router;
