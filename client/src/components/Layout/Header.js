import React from 'react';
import {NavLink} from 'react-router-dom'
import './header.css'

const Header = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg ">
      <div className="container">
        <NavLink to="/" className="navbar-brand fs-4" href="#">Bootstrap Navbar</NavLink>
        
        <button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
  
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll" style={{ scrollHeight: 100 }}>
            <li className="nav-item">
              <NavLink to="/" className="nav-link active" aria-current="page" href="#">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/" className="nav-link" href="#">Link</NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink to="/" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Link
              </NavLink>
              <ul className="dropdown-menu">
                <li><NavLink to="/" className="dropdown-item" href="#">Action</NavLink></li>
                <li><NavLink to="/" className="dropdown-item" href="#">Another action</NavLink></li>
                <li><hr className="dropdown-divider" /></li>
                <li><NavLink to="/" className="dropdown-item" href="#">Something else here</NavLink></li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink to="/" className="nav-link disabled" aria-disabled="true">Link</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>
  
  
  );
};

export default Header;