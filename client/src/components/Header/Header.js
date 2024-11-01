import React, { useState } from 'react';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import './header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State for search box visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="header">
       <h3>WaveGuard</h3>
      <div className="logo">
        <FaSearch onClick={toggleSearch} /> {/* Clicking the search icon toggles the search box */}
      </div>
     
      
      <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
        <a href="#">LINK</a>
        <a href="#">LINK</a>
        <a href="#">LINK</a>
        <a href="#">LINK</a>
      </nav>
      
      {/* Menu icon for mobile/tablet view */}
      <div className="menu-icon" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Floating search box */}
      {isSearchOpen && (
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <button onClick={toggleSearch}>Search</button>
          <button onClick={toggleSearch}>Close</button>
        </div>
      )}
    </header>
  );
};

export default Header;
