import { motion } from 'framer-motion';
import '../styles/hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className='hi'>
          Hi, I'm <span>Bouchama Akram</span>
        </h1>
        <h2>Full Stack Web Developer</h2>
        <p>
          I build exceptional digital experiences with modern technologies.
        </p>
        <div className="hero-buttons">
          <a href="#contact" className="btn-primary">
            Hire Me
          </a>
          <a href="#projects" className="btn-secondary">
            View Work
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;