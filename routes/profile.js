const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');

router.get('/profile_settings', profileController.getProfile);
router.post('/profile_settings', profileController.updateProfile);

module.exports = router;
