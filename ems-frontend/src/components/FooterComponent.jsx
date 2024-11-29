import React from 'react';
import githubIcon from '/github.svg';
import linkedinIcon from '/linkedin.svg';
import '../styles/FooterComponent.css';

const FooterComponent = () => {
  return (
    <footer className="footer custom-bg fixed-bottom d-flex justify-content-between align-items-center p-3">
      <span>Developed by Ak Studios | &copy; {new Date().getFullYear()}</span>
      <div className="social-icons">
        {/* GitHub Icon */}
        <a
          href="https://github.com/your-github-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <img
            src={githubIcon}  // Imported GitHub icon
            alt="GitHub"
            width="24"
            height="24"
            className="mx-2"
          />
        </a>

        {/* LinkedIn Icon */}
        <a
          href="https://www.linkedin.com/in/your-linkedin-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <img
            src={linkedinIcon}  // Imported LinkedIn icon
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
