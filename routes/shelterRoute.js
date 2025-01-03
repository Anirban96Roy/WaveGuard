const express = require('express');
const router = express.Router();
const Shelter = require('../models/shelterModel');

router.get('/nearby', async (req, res) => {
  try {
    const location = req.query.location;
    
    if (!location) {
      return res.status(400).json({
        success: false,
        message: 'Location is required'
      });
    }

    const [zilla, upazila] = location.split(',').map(part => part.trim());

    const shelter = await Shelter.findOne({ 
      zilla,
      'upazilas.name': upazila 
    });

    if (!shelter) {
      return res.json({
        success: true,
        data: []
      });
    }

    const matchingUpazila = shelter.upazilas.find(u => u.name === upazila);
    const shelterData = matchingUpazila ? matchingUpazila.shelters : [];

    res.json({
      success: true,
      data: shelterData
    });
    console.log('Shelter data:', shelterData);

  } catch (error) {
    console.error('Shelter route error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching nearby shelters'
    });
  }
});

module.exports = router;