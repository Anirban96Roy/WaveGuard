import React from 'react';

const PostCard = ({ post }) => (
    <div className="post-card">
        <h3>{post.name}</h3>
        <p>{post.content}</p>
        {post.media && (
            <img
                src={`http://localhost:8000${post.media}`} // Use the backend URL here
                alt="Post Media"
                style={{ maxWidth: '50%' }}
            />
        )}
        <small>{new Date(post.createdAt).toLocaleString()}</small>
    </div>
);

export default PostCard;
