import { motion } from 'framer-motion';
import { FaReact, FaLaravel, FaDatabase, FaBrain } from 'react-icons/fa';
import { SiGraphql } from 'react-icons/si';
import '../styles/skills.css';

const skills = [
  {
    name: 'Soft Skills',
    icon: <FaBrain />,
    items: ['Problem Solving', 'Leadership', 'Communication', 'Adaptability', 'Teamwork'],
    className: 'bento-large'
  },
  {
    name: 'Frontend',
    icon: <FaReact />,
    items: ['React', 'Next.js', 'Redux', 'HTML/CSS', 'Tailwind', 'bootstrap', 'blade'],
    className: 'bento-medium'
  },
  {
    name: 'Other',
    icon: <SiGraphql />,
    items: ['scrum', 'Docker', 'AWS', 'CI/CD'],
    className: 'bento-small'
  },
  {
    name: 'Database',
    icon: <FaDatabase />,
    items: ['MongoDB', 'MySQL', 'SQLite'],
    className: 'bento-small'
  },
  {
    name: 'Backend',
    icon: <FaLaravel />,
    items: ['Node.js', 'Laravel', 'Express', 'NestJS'],
    className: 'bento-medium'
  },
];

const Skills = () => {
  return (
    <section id="status-skills" className="skills">
      <motion.div
        className="skills-container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title" id="skills">My Skills</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className={`skill-card glass-panel ${skill.className}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
              }}
            >
              <div className="skill-card-content">
                <div className="skill-header">
                  <div className="skill-icon">{skill.icon}</div>
                  <h3>{skill.name}</h3>
                </div>
                <ul className="skill-list">
                  {skill.items.map((item) => (
                    <li className="skill-item" key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="card-shine"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;