import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostTemplate from './postTemplate';
import PostList from './PostList';
import '../customCSS/post.css';
import Layout from '../components/Layout/Layout';

const PostHerePage = () => {
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <Layout>
            <div className="post-here-page">
                
                
                    <h1>Share your story with the world, one post at a time!</h1>       
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="post-here-btn"
                >
                    Add Post
                </button>    
                <div
                    className={`modal ${isModalOpen ? '' : 'hidden'}`}
                    aria-hidden={!isModalOpen}
                >
                    {isModalOpen && (
                        <PostTemplate
                            refreshPosts={fetchPosts}
                            closeModal={() => setIsModalOpen(false)}
                        />
                    )}
                </div> 
                <PostList posts={posts} />
            </div>
        </Layout>
    );
};

export default PostHerePage;
