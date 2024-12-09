const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  tran_id: {
    type: String,
    unique: true,
    default: () => `donation-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`, // Auto-generate a unique ID
  },
  name: String,
  email: String,
  amount: Number,
  orgId: Number,
}, { timestamps: true });

const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;
