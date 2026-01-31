import { motion } from 'framer-motion';
import '../styles/about.css';
import CV from '../assets/CV.pdf';

const About = () => {
  return (
    <section id="about" className="about">
      <motion.div
        className="about-container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="about-content">
          <h2>About Me</h2>
          <p>
            I'm a junior full stack web developer with experience
            building web applications. I specialize in JavaScript and PHP technologies
            across the whole stack (React.js, Node.js, Express, MongoDB, Laravel, Symfony).
          </p>
          <p>
            My approach combines technical expertise with an eye for design to
            create efficient, scalable, and user-friendly applications.
          </p>
          <div className="about-details">
            <div>
              <h4>Name:</h4>
              <p>Bouchama Akram</p>
            </div>
            <div>
              <h4>Email:</h4>
              <p>boouchamaakraam@gmail.com</p>
            </div>
            <div>
              <h4>Experience:</h4>
              <div className='list'>
                <li className='exp'>web developer internship at camiverre</li>
                <li className='exp'>freelance web developer</li>
                <li className='exp'>freelance 3D designer</li>
              </div>
            </div>
            <div>
              <h4>Location:</h4>
              <p>Marrakech ,Morocco </p>
            </div>
          </div>
          <a href={CV} download="Akram_Bouchama_CV.pdf" className="btn-primary">
            Download CV
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default About;