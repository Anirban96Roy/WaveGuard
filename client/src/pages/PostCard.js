import React from 'react';
import '../customCSS/post.css';

const PostCard = ({ post, index }) => (
    <div
        className={`post-card ${
            index % 2 === 0 ? 'left-content' : 'right-content'
        }`}
    >
        {index % 2 === 0 ? (
            <>
                 
                <div className="post-content">
                    <h3>{post.name}</h3>
                    <p>{post.content}</p>
                    <small>{new Date(post.createdAt).toLocaleString()}</small>
                </div>
                {post.media && (
                    <div className="post-image">
                        <img
                            src={`http://localhost:8081${post.media}`}
                            alt="Post Media"
                        />
                    </div>
                )}
            </>
        ) : (
            <>
                {post.media && (
                    <div className="post-image">
                        <img
                            src={`http://localhost:8081${post.media}`}
                            alt="Post Media"
                        />
                    </div>
                )}
                <div className="post-content">
                    <h3>{post.name}</h3>
                    <p>{post.content}</p>
                    <small>{new Date(post.createdAt).toLocaleString()}</small>
                </div>
            </>
        )}
       
    </div>
);

export default PostCard;
