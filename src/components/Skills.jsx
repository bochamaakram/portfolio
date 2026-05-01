import { motion } from 'framer-motion';
import { FaReact, FaLaravel, FaDatabase, FaBrain } from 'react-icons/fa';
import { SiGraphql } from 'react-icons/si';
import '../styles/skills.css';

const skills = [
  {
    name: 'Frontend',
    icon: <FaReact />,
    items: ['React', 'Next.js', 'Redux', 'HTML/CSS', 'Tailwind', 'Bootstrap', 'Blade'],
  },
  {
    name: 'Backend',
    icon: <FaLaravel />,
    items: ['Node.js', 'Laravel', 'Express', 'NestJS', 'Symfony'],
  },
  {
    name: 'Database',
    icon: <FaDatabase />,
    items: ['MongoDB', 'MySQL', 'PostgreSQL', 'SQLite'],
  },
  {
    name: 'Soft Skills',
    icon: <FaBrain />,
    items: ['Problem Solving', 'Leadership', 'Communication', 'Adaptability', 'Teamwork'],
  },
  {
    name: 'Tools & DevOps',
    icon: <SiGraphql />,
    items: ['Docker', 'AWS', 'CI/CD', 'Git', 'n8n', 'Scrum'],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="skills">
      <motion.div
        className="skills-container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Technical Skills</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-card glass-panel"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="skill-header">
                <div className="skill-icon">{skill.icon}</div>
                <h3>{skill.name}</h3>
              </div>
              <ul className="skill-list">
                {skill.items.map((item) => (
                  <li className="skill-item" key={item}>{item}</li>
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