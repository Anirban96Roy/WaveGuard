import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header.module.css';

const Header = () => {
  return (
    <>
      <nav className={`${styles.navbar} navbar-expand-lg`}> {/* Combine module and Bootstrap classes */}
        <div className={styles.container}>
          <NavLink to="/" className={`${styles.navbarBrand} fs-4`}> {/* Apply module class */}
            Bootstrap Navbar
          </NavLink>

          <button
            className={`${styles.navbarToggler} shadow-none border-0`} // Module class for toggler
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className={styles.navbarTogglerIcon} />
          </button>

          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul
              className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll"
              style={{ scrollHeight: 100 }}
            >
              <li className="nav-item">
                <NavLink to="/" className="nav-link active" aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Link
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  to="/"
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Link
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="/" className="dropdown-item">
                      Action
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className="dropdown-item">
                      Another action
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <NavLink to="/" className="dropdown-item">
                      Something else here
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink to="/" className="nav-link disabled" aria-disabled="true">
                  Link
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
