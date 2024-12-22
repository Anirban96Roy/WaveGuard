const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); // Assuming you have the User model

// Define the /volunteers/nearby route
router.get('/nearby', async (req, res) => {
  const { location } = req.query;

  try {
    if (!location) {
      return res.status(400).json({ message: "Location parameter is required." });
    }

    // Split the location string into individual terms
    const locationTerms = location.split(',').map(term => term.trim());

    // Create a regex pattern that matches if ANY of the terms are found
    // This will create a pattern like: (?=.*\b(term1)\b)|(?=.*\b(term2)\b)|(?=.*\b(term3)\b)
    const regexPattern = locationTerms
      .map(term => `(?=.*\\b(${term})\\b)`)
      .join('|');

    const nearbyVolunteers = await User.find({
      $and: [
        {
          // Using regex with word boundaries to match whole words
          location: {
            $regex: new RegExp(regexPattern, 'i')
          }
        },
        { role: 'volunteer' }
      ]
    }).select('-password'); // Exclude password from the response

    // Add debug information if needed
    const debugInfo = {
      searchPattern: regexPattern,
      termsSearched: locationTerms,
      resultsFound: nearbyVolunteers.length
    };

    // Set cache control headers
    res.set({
      'Cache-Control': 'no-store, no-cache, must-revalidate, private',
      'Expires': '0',
      'Pragma': 'no-cache'
    });

    res.json({
      volunteers: nearbyVolunteers,
      debug: process.env.NODE_ENV === 'development' ? debugInfo : undefined
    });

  } catch (error) {
    console.error("Error in nearby volunteers search:", error);
    res.status(500).json({
      message: "Error fetching nearby volunteers.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});


module.exports = router;
