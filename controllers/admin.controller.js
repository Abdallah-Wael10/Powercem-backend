const data = require("../model/admin.model");
const asyncWrapper = require("../middleware/asyncwrapper");
const bcrypt = require("bcrypt");
const genrate = require("../utils/genrateToken");

// Register User
const register = asyncWrapper(async (req, res) => {
  const { fullName, email, phone, password } = req.body;
  const existingUser = await data.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new data({ fullName, email, phone, password: hashedPassword });
  const token = await genrate({ email: user.email, id: user.id });
  user.token = token;
  await user.save();

  res.json({
    message: "User registered successfully",
    token,
  });
});

// Login User
const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }
  const user = await data.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = await genrate({ email: user.email, id: user.id });
  return res.status(200).json({ data: { token } });
});

// Get All Users
const allUsers = asyncWrapper(async (req, res) => {
  const users = await data.find({}, { password: false, __v: false });
  res.json(users);
});

// Get Single User
const getuser = asyncWrapper(async (req, res) => {
  const user = await data.findById(req.params.id, { password: false, __v: false });
  if (!user) return res.status(404).json({ msg: "User not found" });
  res.json(user);
});

// Update User
const updateUser = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const { password, ...updateFields } = req.body;

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateFields.password = hashedPassword;
  }

  const user = await data.updateOne({ _id: id }, { $set: updateFields });
  if (user.modifiedCount === 0) {
    return res.status(404).json({ error: "No user found or no changes made" });
  }

  res.status(200).json({ message: "User updated successfully", user });
});

// Delete User
const deleteUser = asyncWrapper(async (req, res) => {
  await data.deleteOne({ _id: req.params.id });
  res.json({ message: "User deleted successfully." });
});

module.exports = {
  allUsers,
  getuser,
  register,
  login,
  updateUser,
  deleteUser,
};