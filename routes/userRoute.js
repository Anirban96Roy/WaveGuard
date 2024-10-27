const express = require('express')
const { loginController, registerController } = require('../controllers/userController')

//router object
const router = express.Router()

//routers
router.post('/login',loginController);
router.post('/register',registerController);


module.exports = router