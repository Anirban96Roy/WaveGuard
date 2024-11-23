const express = require('express');
const multer = require('multer');
const Post = require('../models/postModel');

const router = express.Router();

// Configure Multer for media uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Add a new post
// Add a new post
router.post('/', upload.single('media'), async (req, res) => {
    try {
        const { name, content } = req.body;
        const media = req.file ? `/uploads/${req.file.filename}` : null;

        const post = new Post({ name, content, media });
        await post.save();
        res.status(201).json(post); // Return the saved post
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
