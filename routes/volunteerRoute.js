const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); // Assuming you have the User model

// Define the /volunteers/nearby route
router.get('/nearby', async (req, res) => {
  const { location } = req.query; // Get the location parameter from the query string
  try {
    // Query the users collection for volunteers whose location matches the provided location
    const nearbyVolunteers = await User.find({
      location: { $regex: new RegExp(location, 'i') }, // Case-insensitive matching
      role: 'volunteer',
    });

    // Disable caching for this response
    res.set('Cache-Control', 'no-store');

    // Respond with the nearby volunteers
    res.json({ volunteers: nearbyVolunteers });
  } catch (error) {
    console.error("Error fetching nearby volunteers:", error);
    res.status(500).json({ message: "Error fetching nearby volunteers." });
  }
});


module.exports = router;
