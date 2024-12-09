const express = require('express')

 // Import the Donation model
const router = express.Router();
const Donation = require('../models/Donation');
const { donationsController, automationController } = require('../controllers/donationController')

//routers
router.post('/donations',donationsController);
router.post('/automate-donation',automationController);

router.get('/donation-stats', async (req, res) => {
    try {
      const stats = await Donation.aggregate([
        {
          $group: {
            _id: "$orgId",
            totalDonation: { $sum: "$amount" },
            donators: { $sum: 1 },
          },
        },
      ]);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch donation stats" });
    }
  });
  


// POST route to save donation to MongoDB


// POST route to automate the real payment gateway interaction


module.exports = router;
