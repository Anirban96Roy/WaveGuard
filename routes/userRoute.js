const express = require('express')
const { loginController, registerController, getUserProfile, updateUserProfile,getLocations } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()


//routers
router.post('/login',loginController);
router.post('/register',registerController);
router.get('/:id', protect, getUserProfile);
router.put("/:id", protect, updateUserProfile); 
router.get("/locations", getLocations);

module.exports = router;