const express = require("express");
const router = express.Router();
const locationModel = require("../models/locationModel"); // Your Mongoose model for the locations collection

// GET /api/v1/locations
router.get("/locations", async (req, res) => {
  try {
    const locations = await locationModel.find(); // Fetch all locations from the database
    res.status(200).json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error.message);
    res.status(500).json({ message: "Failed to fetch locations" });
  }
});

module.exports = router;
