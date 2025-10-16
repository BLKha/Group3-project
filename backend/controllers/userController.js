const User = require('../models/User');

// GET /users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /users
exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Nếu đã có PUT/DELETE từ Hoạt động 7, cập nhật tương tự:
// PUT /users/:id
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /users/:id
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// cập nhật 
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updated = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
};

// xóa
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: 'Deleted' });
};