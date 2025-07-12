import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import '../styles/projects.css';
import project01 from '../assets/01.png';
import project02 from '../assets/02.png';
import project03 from '../assets/03.jpg';
import project04 from '../assets/04.jpg';
import project05 from '../assets/05.png';
import project06 from '../assets/06.png';
import project07 from '../assets/07.png';
import project08 from '../assets/03.jpg';

const projects = [
  {
    id: 1,
    title: 'mp3 from Youtube',
    description: 'a free tool for downloading mp3 fils from a youtube link',
    tags: ['React', 'API', 'vercel', 'javascript'],
    image: project01,
    github: 'https://github.com/bochamaakram/audio-Downloader?tab=readme-ov-file',
    live: 'https://audio-downloader-sable.vercel.app/',
  },
  {
    id: 2,
    title: 'EldenSetup ',
    description: 'A modern e-commerce platform for high-performance laptops and PC components.',
    tags: ['React', 'API', 'larvel', 'vercel', 'javascript'],
    image: project02,
    github: 'https://github.com/bochamaakram/EldenSetups',
  },
  {
    id: 3,
    title: 'EldenSetup Back',
    description: 'the backend for EldenSetup .',
    tags: ['Laravel', 'Backend', 'API', 'PHP'],
    image:  project03,
    github: 'https://github.com/bochamaakram/EldenSetups-back',
  },
  {
    id: 4,
    title: 'StorageHub',
    description: 'A Laravel-based storage management system.',
    tags: ['Laravel', 'Backend', 'API', 'PHP'],
    image:  project04,
    github: 'https://github.com/bochamaakram/StorageHub',
  },
  {
    id: 5,
    title: 'camialu',
    description: 'This project was built during my internship to highlight the companys services, achievements, and team.',
    tags: ['React', 'API', 'larvel', 'vercel', 'javascript'],
    image:  project05,
    live: 'https://camialu.vercel.app/',
  },
  {
    id: 6,
    title: 'irshade',
    description: 'a comprehensive platform designed to help users deepen their understanding of Islam. Our site provides a variety of resources, including Quran readings, Islamic learning materials, and a community support section for seeking guidance from knowledgeable individuals.',
    tags: ['scrum', 'Backend', 'API', 'PHP'],
    image:  project06,
    github: 'https://github.com/bochamaakram/project-ajile',
    live: 'https://irshade.wuaze.com/?i=2',
  },
  {
    id: 7,
    title: 'Billing app',
    description: 'a billing system, built with modern web technologies.',
    tags: ['React', 'API', 'Express', 'Frontend', 'javascript'],
    image:  project07,
    github: 'https://github.com/bochamaakram/billing-app-frontend',
  },
  {
    id: 8,
    title: 'Billing App Backend',
    description: 'backend service for the Billing App, built with Node.js and Express.',
    tags: ['API', 'Express', 'Node.js', 'javascript'],
    image:  project08,
    github: 'https://github.com/bochamaakram/billing-app-backend',
  },
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const projectFilters = ['All', 'React', 'Laravel', 'API', 'PHP', 'javascript'];

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    if (filter === 'All') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter((project) =>
        project.tags.includes(filter)
      );
      setFilteredProjects(filtered);
    }
  };

  return (
    <section id="projects" className="projects">
      <motion.div
        className="projects-container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>My Projects</h2>
        <div className="project-filters">
          {projectFilters.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => handleFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <FiGithub />
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      <FiExternalLink />
                    </a>
                  )}
                </div>
              </div>
              <div className="project-details">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;