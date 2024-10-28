import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import styles from './footer.module.css'; // Import CSS module

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h5>Follow Us</h5>
        <ul className={styles.socialList}> {/* Updated class name */}
          <li>
            <a href="#" className={styles.textWhite}>
              <FaFacebook /> Facebook
            </a>
          </li>
          <li>
            <a href="#" className={styles.textWhite}>
              <FaTwitter /> Twitter
            </a>
          </li>
          <li>
            <a href="#" className={styles.textWhite}>
              <FaInstagram /> Instagram
            </a>
          </li>
          <li>
            <a href="#" className={styles.textWhite}>
              <FaLinkedin /> LinkedIn
            </a>
          </li>
        </ul>
        <p className={`${styles.textCenter} ${styles.mb0}`}>
          © 2024 Your Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
