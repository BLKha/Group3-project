const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET: Lấy danh sách người dùng
router.get('/users', userController.getUsers);

// POST: Thêm người dùng mới
router.post('/users', userController.createUser);

module.exports = router;