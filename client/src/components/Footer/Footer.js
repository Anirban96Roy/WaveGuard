import React from 'react';
import './footer.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Contact us section on the left */}
        <p>Contact us: email@example.com
        <p>All rights reserved 2024</p>
        </p>
        

        {/* Social media icons on the right */}
        <div className="social-icons">
          <h5>Share on:</h5>
          <a href="https://facebook.com"><FaFacebook /></a>
          <a href="https://twitter.com"><FaTwitter /></a>
          <a href="https://instagram.com"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
