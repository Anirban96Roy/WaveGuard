import React from 'react';
import PostCard from './PostCard';
import '../customCSS/post.css';

const PostList = ({ posts }) => (
    <div className="post-list">
        {posts.map((post, index) => (
            <PostCard key={post._id} post={post} index={index} />
        ))}
    </div>
);

export default PostList;
