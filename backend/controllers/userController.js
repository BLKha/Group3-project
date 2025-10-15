// Mảng tạm để lưu trữ người dùng
let users = [];

// GET: Lấy danh sách người dùng
exports.getUsers = (req, res) => {
    res.status(200).json(users);
};

// POST: Thêm người dùng mới
exports.createUser = (req, res) => {
    const user = req.body; // Lấy dữ liệu từ body
    if (!user.name || !user.email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }
    users.push({ id: users.length + 1, ...user }); // Thêm user vào mảng
    res.status(201).json({ message: 'User created', user });
};