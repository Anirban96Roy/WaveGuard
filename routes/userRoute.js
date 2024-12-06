const express = require('express')
const { loginController, registerController, getUserProfile } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

//routers
router.post('/login',loginController);
router.post('/register',registerController);
router.get('/:id', protect, getUserProfile);

module.exports = router