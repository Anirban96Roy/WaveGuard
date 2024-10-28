import React from 'react';
import Layout from '../components/Layout/Layout';
import styles from '../customCSS/homepage.module.css'; // Import the CSS module
import v from '../components/v.mp4';

const HomePage = () => {
  return (
    <Layout>
      <div className={styles.content}>
        <video autoPlay loop muted playsInline className={styles.bgvideo}>
          <source src={v} type="video/mp4" />
        </video>
        <div className={styles.overlay}></div> {/* Dark overlay on video */}
        <h1>Flood Management & Monitoring System</h1>
        <p>
          Welcome to our Flood Management & Monitoring System, designed to provide real-time data and resources to help communities prepare for and respond to flooding events.<br />
          Our platform utilizes advanced technology to track weather patterns, monitor water levels, and provide timely alerts.<br />
          We aim to enhance safety and resilience by empowering individuals and organizations with the information they need to mitigate the impact of floods. Join us in our mission to create safer, more prepared communities!
        </p>
        <div className={styles.buttonx}>
          <button type="button">
            Need Help?
            <span></span> {/* Hover effect span */}
          </button>
          <span> <span> </span> </span>
          <button type="button">
            Wanna Be a Volunteer?
            <span></span> {/* Hover effect span */}
          </button>
        </div>


       
      </div>
    </Layout>
  );
};

export default HomePage;
