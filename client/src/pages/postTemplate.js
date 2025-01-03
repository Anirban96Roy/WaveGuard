import React, { useState } from 'react';
import axios from 'axios';

const PostTemplate = ({ refreshPosts, closeModal }) => {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [media, setMedia] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('content', content);
        if (media) formData.append('media', media);

        try {
            await axios.post('/posts', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            refreshPosts(); // Update the post list
            closeModal(); // Close modal
        } catch (error) {
            console.error('Error adding post:', error);
            alert('Failed to add post');
        }
    };

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <h2>Add a New Post</h2>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Write something..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
                <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => setMedia(e.target.files[0])}
                />
                <button type="submit">Post</button>
                <button type="button" onClick={closeModal}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default PostTemplate;
