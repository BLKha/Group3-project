const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/', profileController.authMiddleware, profileController.getProfile);
router.put('/', profileController.authMiddleware, profileController.updateProfile);

module.exports = router;