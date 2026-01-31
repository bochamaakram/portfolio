import { motion } from 'framer-motion';
import { FaReact, FaLaravel , FaDatabase } from 'react-icons/fa';
import { SiGraphql } from 'react-icons/si';
import '../styles/skills.css';

const skills = [
  { name: 'Frontend', icon: <FaReact />, items: ['React', 'Next.js', 'Redux', 'HTML/CSS', 'Tailwind', 'bootstrap', 'blade'] },
  { name: 'Backend', icon: <FaLaravel />, items: ['Node.js', 'Laravel', 'Express', 'NestJS'] },
  { name: 'Database', icon: <FaDatabase />, items: ['MongoDB', 'MySQL', 'SQLite'] },
  { name: 'Other', icon: <SiGraphql />, items: ['scrum', 'Docker', 'AWS', 'CI/CD'] },
];

const Skills = () => {
  return (
    <section id="skills" className="skills">
      <motion.div
        className="skills-container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>My Skills</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="skill-icon">{skill.icon}</div>
              <h3>{skill.name}</h3>
              <ul>
                {skill.items.map((item) => (
                  <li className="skillitems" key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;