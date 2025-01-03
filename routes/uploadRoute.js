const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('../models/userModel'); // Adjust the path as needed
const path = require('path'); // Add this line

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/:id/upload-picture', upload.single('profilePicture'), async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.profilePicture = `/uploads/${req.file.filename}`;
    await user.save();

    res.status(200).json({ imagePath: user.profilePicture });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id/profile-picture', async (req, res) => {
    try {
      const userId = req.params.id;
  
      const user = await User.findById(userId);
      if (!user || !user.profilePicture) {
        return res.status(404).json({ message: 'Profile picture not found' });
      }
  
      res.status(200).json({ imagePath: user.profilePicture });
    } catch (error) {
      console.error('Error fetching profile picture:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;
