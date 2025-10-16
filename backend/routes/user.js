const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET: Lấy danh sách người dùng (mounted at /users in server.js)
router.get('/', userController.getUsers);

// POST: Thêm người dùng mới
router.post('/', userController.createUser);

// sửa
router.put('/:id', userController.updateUser);
// xóa
router.delete('/:id', userController.deleteUser);

module.exports = router;