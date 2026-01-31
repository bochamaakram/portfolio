import { FaGithub, FaLinkedin, FaInstagram   } from 'react-icons/fa';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-about">
            <h3>Akram Bouchama</h3>
            <p>Full Stack Web Developer building modern web applications.</p>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#skills">Skills</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-social">
            <h3>Connect With Me</h3>
            <div className="social-icons">
              <a
                href="https://github.com/bochamaakram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href="https://ma.linkedin.com/in/akram-bouchama-8b287532a"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.instagram.com/akram_bouucham/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram   />
              </a>
            </div>
          </div>
        </div>
        <hr />
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} akram bouchama. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;