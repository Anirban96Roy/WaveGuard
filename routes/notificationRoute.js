const express = require('express');
const router = express.Router();
const Notification = require('../models/notificationModel');
const User = require('../models/userModel');
const { protect } = require('../middleware/authMiddleware');

// Get notifications for logged-in user
router.get('/', protect, async (req, res) => {
  try {
    console.log("User from auth:", req.user); // Add this to see what user data we have
    const notifications = await Notification.find({ recipient: req.user._id })
      .populate('sender', 'name')
      .sort({ createdAt: -1 });
      console.log("Found notifications:", notifications); 
    res.json(notifications);
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Mark notification as read
router.put('/:id/read', protect, async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create rescue request notification
router.post('/rescue-request', protect, async (req, res) => {
  try {
    const { victimId } = req.body;
    const victim = await User.findById(victimId);
    
    const notification = new Notification({
      recipient: victimId,
      sender: req.user._id,
      type: 'RESCUE_REQUEST',
      message: `${req.user.name} has offered to rescue you. Please approve or reject.`
    });
    
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Handle rescue approval/rejection
router.post('/rescue-response', protect, async (req, res) => {
  try {
    const { notificationId, approved } = req.body;
    const notification = await Notification.findById(notificationId);
    
    if (approved) {
      // Create notification for volunteer
      const approvalNotification = new Notification({
        recipient: notification.sender,
        sender: req.user._id,
        type: 'RESCUE_APPROVED',
        message: `${req.user.name} has approved your rescue request.`
      });
      await approvalNotification.save();
      
      // Delete victim from users collection
      await User.findByIdAndDelete(req.user._id);
    } else {
      const rejectionNotification = new Notification({
        recipient: notification.sender,
        sender: req.user._id,
        type: 'RESCUE_REJECTED',
        message: `${req.user.name} has rejected your rescue request.`
      });
      await rejectionNotification.save();
    }
    
    await Notification.findByIdAndDelete(notificationId);
    res.json({ message: 'Response processed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;