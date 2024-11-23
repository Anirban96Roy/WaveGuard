const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
    media: { type: String }, // Media URL
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);
