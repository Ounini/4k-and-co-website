const express = require("express");
const {
  createUser,
  getUsers,
  updateUser,
  loginUser,
  getUserById,
  deleteUser,
  deleteUserById,
} = require("../controller/userController");
const { authenticateToken, isAdmin } = require("../middlewares/authenticate");
const router = express.Router();

router.post("/create", createUser);
router.get("/all-users", authenticateToken, isAdmin, getUsers);
router.get("/:id", authenticateToken, getUserById);
router.delete("/delete-user", authenticateToken, isAdmin, deleteUser);
router.delete("/:id", authenticateToken, deleteUserById);
router.put("/update/:id", authenticateToken, updateUser);
router.post("/login", loginUser);

module.exports = router;
