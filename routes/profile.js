const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware.verifyToken);

router.get('/', profileController.getProfile);
router.post('/update', profileController.update);

module.exports = router;
