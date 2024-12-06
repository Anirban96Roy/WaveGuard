// src/pages/Homepage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../customCSS/homepage.css';
import v from '../components/v.mp4';
import Layout from '../components/Layout/Layout';

const HomePage = () => {
  const navigate = useNavigate();  // Initialize the navigate hook

  // Function to handle Help Me! button click
  const handleHelpClick = (role) => {
    navigate(`/register?role=${role}`); // Navigate with the role as a query parameter
  };
  

  return (
    <Layout>
      <div className="homepage">
        <div className="video-container">
          <video autoPlay loop muted playsInline className="bgvideo">
            <source src={v} type="video/mp4" />
          </video>
        </div>

        <h1>WaveGuard</h1>
        <p> Welcome to our Flood Management & Monitoring System, designed to provide real-time data and resources to help communities prepare for and respond to flooding events.<br />
        Our platform utilizes advanced technology to track weather patterns, monitor water levels, and provide timely alerts.</p>
        <div className="buttonx">
  <button type="button" onClick={() => handleHelpClick("victim")}>
    Help Me!
    <span></span>
  </button>
  <button type="button" onClick={() => handleHelpClick("volunteer")}>
    I want to volunteer
    <span></span>
  </button>
</div>

        <div className="card-holder">
          <div className="card">
            <p>Card 1 content</p>
          </div>
          <div className="card">
            <p>Card 2 content</p>
          </div>
          <div className="card">
            <p>Card 3 content</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
