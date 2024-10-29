import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
    <>
       <footer className="footer">
      <div className="container">
       
        <h5>Follow Us</h5>
        <ul className="social-list">
          <li>
            <a href="#" className="text-white">
              <FaFacebook /> Facebook
            </a>
          </li>
          <li>
            <a href="#" className="text-white">
              <FaTwitter /> Twitter
            </a>
          </li>
          <li>
            <a href="#" className="text-white">
              <FaInstagram /> Instagram
            </a>
          </li>
          <li>
            <a href="#" className="text-white">
              <FaLinkedin /> LinkedIn
            </a>
          </li>
        </ul>
        <p className="text-center mb-0">© 2024 Your Company Name. All rights reserved.</p>
      </div>
    </footer>
    </>
  );
};

export default Footer;