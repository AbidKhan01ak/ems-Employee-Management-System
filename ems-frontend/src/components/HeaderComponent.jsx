import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/HeaderComponent.css'; 

export const HeaderComponent = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark custom-bg shadow sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img
              src="/team.png"
              alt="logo"
              style={{ width: '40px' }}
              className="me-2"
            />
            <span className="fw-bold">Employee Manager</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link fw-semibold ${isActive ? 'active-page' : 'text-white'}
                  `}
                  to="/employees"
                >
                  Employees
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link fw-semibold ${isActive ? 'active-page' : 'text-white'}
                  `}
                  to="/departments"
                >
                  Departments
                </NavLink>
              </li>
              {/* Dark Mode Toggle */}
              <li className="nav-item">
                <button
                  className="btn btn-outline-light ms-3"
                  onClick={toggleDarkMode}
                >
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
