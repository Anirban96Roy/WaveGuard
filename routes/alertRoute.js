// routes/routes.js
const express = require('express');
const { getExcelData } = require('../controllers/alertController');  // Import the controller function

const router = express.Router();

// Define the /api/data route
router.get('/data', getExcelData);

module.exports = router;
