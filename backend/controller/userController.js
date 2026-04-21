const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Basic
// Create
const createUser = async (req, res) => {
  try {
    const { name, age, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ email, age, name, password: hashedPassword });
    await user.save();
    res.status(200).json({ message: "User regsitered successfully" });
  } catch (err) {
    res.send(err.message);
  }
};

// login
const loginUser = async (req, res) => {
  console.log("ran login");
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ email });
  console.log(user);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user._id, userEmail: user.email, userRole: user.role },
    process.env.JWT_KEY,
    { expiresIn: "20m" },
  );
  res.json(token);
};

// Read
const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.body;
  console.log("user id:", id);

  await User.findByIdAndDelete(id);
  res.status(200).json("User deleted successfully");
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);
  res.status(200).json("User deleted successfully");
};

// update
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.send("User update successfully", user);
  } catch (err) {
    res.json(err.message);
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  loginUser,
  deleteUser,
  getUserById,
  deleteUserById,
};
