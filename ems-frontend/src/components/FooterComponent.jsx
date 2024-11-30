import React from 'react';
import githubIcon from '/github.svg';
import linkedinIcon from '/linkedin.svg';
import '../styles/FooterComponent.css';

const FooterComponent = () => {
  return (
    <footer className="footer custom-bg fixed-bottom d-flex justify-content-between align-items-center">
      <span>Developed by Ak Studios | &copy; {new Date().getFullYear()}</span>
      <div className="social-icons">
        <a
          href="https://github.com/your-github-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <img
            src={githubIcon} 
            alt="GitHub"
            width="24"
            height="24"
            className="mx-2"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/your-linkedin-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <img
            src={linkedinIcon} 
            alt="LinkedIn"
            width="24"
            height="24"
            className="mx-2"
          />
        </a>
      </div>
    </footer>
  );
};

export default FooterComponent;
