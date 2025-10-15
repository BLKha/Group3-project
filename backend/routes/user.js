const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET: Lấy danh sách người dùng
router.get('/', userController.getUsers);

// POST: Thêm người dùng mới
router.post('/', userController.createUser);

module.exports = router;