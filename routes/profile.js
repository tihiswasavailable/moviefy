const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');
const authMiddleware = require('../middlewares/authMiddleware');

// middleware to verify token for protected routes will be used for all routes in this file
router.use(authMiddleware.verifyToken);

router.get('/', profileController.getProfile);
router.post('/update', profileController.updateProfile);
// router.post('/delete', profileController.deleteProfile);

module.exports = router;
