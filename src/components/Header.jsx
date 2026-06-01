import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiUser, FiCode, FiFolder, FiMail } from 'react-icons/fi';
import '../styles/header.css';

const navLinks = [
  { name: 'About',    href: '#about',    icon: <FiUser /> },
  { name: 'Skills',   href: '#skills',   icon: <FiCode /> },
  { name: 'Projects', href: '#projects', icon: <FiFolder /> },
  { name: 'Contact',  href: '#contact',  icon: <FiMail /> },
];

const Header = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Desktop / top nav ── */}
      <header className="header">
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="logo">Bouchama Akram</div>

          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </motion.nav>
      </header>

      {/* ── Mobile bottom tab bar ── */}
      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={`mobile-tab ${activeSection === link.href.slice(1) ? 'active' : ''}`}
            aria-label={link.name}
          >
            <span className="mobile-tab-icon">{link.icon}</span>
            <span className="mobile-tab-label">{link.name}</span>
          </a>
        ))}
      </nav>
    </>
  );
};

export default Header;