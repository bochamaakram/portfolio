import { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/about.css';
import CV from '../assets/CV.pdf';
import CVModal from './CVModal';

const About = () => {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  const details = [
    { label: 'Name', value: 'Bouchama Akram' },
    { label: 'Location', value: 'Marrakech, Morocco' }
  ];

  const experience = [
    'Full Stack Web Developer & Automation Technician at CleverCube.ai',
    'Freelance Web Developer & 3D Designer'
  ];

  return (
    <section id="about" className="about">
      <motion.div
        className="about-container glass-panel"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="about-content-wrapper">
          <div className="about-text-section">
            <h2>About Me</h2>
            <p className="lead-text">
              I'm a full stack web developer with experience building dynamic web applications.
              I specialize in JavaScript and PHP technologies across the whole stack
              (React.js, Node.js, Express, MongoDB, Laravel, Symfony).
            </p>
            <p className="sub-text">
              My approach combines technical expertise with an eye for design to
              create efficient, scalable, and user-friendly applications that leave a lasting impression.
            </p>
            <div className="about-actions">
              <button
                onClick={() => setIsCVModalOpen(true)}
                className="btn-premium"
              >
                <span>View My CV</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </button>
            </div>
          </div>

          <div className="about-details-section">
            <div className="info-cards">
              {details.map((item, index) => (
                <motion.div
                  className="info-card glass-panel-sm"
                  key={index}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <h4>{item.label}</h4>
                  <p>{item.value}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="experience-card glass-panel-sm"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <h4>Experience</h4>
              <ul className='exp-list'>
                {experience.map((exp, index) => (
                  <li key={index} className='exp-item'>
                    <span className="bullet"></span>
                    {exp}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <CVModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
        cvUrl={CV}
      />
    </section>
  );
};

export default About;