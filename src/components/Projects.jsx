import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import '../styles/projects.css';
import projectsData from '../data/projects.json';

// Image imports
import project01 from '../assets/01.png';
import project02 from '../assets/02.png';
import project03 from '../assets/03.jpg';
import project04 from '../assets/04.jpg';
import project05 from '../assets/05.jpg';
import project06 from '../assets/06.png';
import project07 from '../assets/07.png';
import project09 from '../assets/09.jpg';
import project10 from '../assets/10.png';
import project11 from '../assets/11.jpg';
import project12 from '../assets/12.png';
import project13 from '../assets/13.png';
import project14 from '../assets/14.png';

// Map image filenames to imported assets
const imageMap = {
  '01.png': project01,
  '02.png': project02,
  '03.jpg': project03,
  '04.jpg': project04,
  '05.jpg': project05,
  '06.png': project06,
  '07.png': project07,
  '09.jpg': project09,
  '10.png': project10,
  '11.jpg': project11,
  '12.png': project12,
  '13.png': project13,
  '14.png': project14,
};

// Map projects data with resolved images
const projects = projectsData.map((project) => ({
  ...project,
  image: imageMap[project.image],
}));

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const projectFilters = ['All', 'React', 'Laravel', 'API', 'PHP', 'javascript', 'n8n'];

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
    if (filter === 'All') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter((project) =>
        project.tags.includes(filter)
      );
      setFilteredProjects(filtered);
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProjects.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

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

        {/* Pagination Controls */}
        {filteredProjects.length > itemsPerPage && (
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="page-btn"
            >
              Prev
            </button>
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`page-btn ${currentPage === number ? 'active' : ''}`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === pageNumbers.length}
              className="page-btn"
            >
              Next
            </button>
          </div>
        )}
        <br />
        <div className="projects-grid">
          {currentProjects.map((project, index) => (
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