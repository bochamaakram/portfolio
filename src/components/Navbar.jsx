import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as LightModeIcon } from '../icons/light-mode.svg';
import { ReactComponent as DarkModeIcon } from '../icons/dark-mode.svg';

function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <div className="container-fluid d-flex justify-content-between align-items-center">
      <header className="header bg-primary text-white py-3 navbar navbar-expand-lg navbar-light">
        <nav>
          <ul className="navbar-nav flex-row">
            <li className="nav-item d-flex justify-content-center mx-2">
              <Link className="nav-link text-white" to="/">About</Link>
            </li>
            <li className="nav-item d-flex justify-content-center mx-2">
              <Link className="nav-link text-white" to="/skills">Skills</Link>
            </li>
            <li className="nav-item d-flex justify-content-center mx-2">
              <Link className="nav-link text-white" to="/projects">projects</Link>
            </li>
            <li className="nav-item d-flex justify-content-center mx-2">
              <Link className="nav-link text-white" to="/contact">Contact</Link>
            </li>
        <button className="nav-item d-flex justify-content-righte btn btn-outline-light theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </button>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
