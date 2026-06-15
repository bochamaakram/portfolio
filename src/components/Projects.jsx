import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useAnimationFrame } from 'framer-motion';
import { FiGithub, FiExternalLink, FiX } from 'react-icons/fi';
import '../styles/projects.css';
import projectsData from '../data/projects.json';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const projectFilters = ['All', 'React', 'Laravel', 'API', 'PHP', 'javascript', 'n8n'];

  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter(project => project.tags.includes(activeFilter));

  const rotation = useMotionValue(0);
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const velocity = useRef(0);

  useAnimationFrame((t, delta) => {
    if (isDragging.current) return;

    // Smoothly decay the pan velocity
    if (Math.abs(velocity.current) > 0.1) {
      // Scale decay by delta time so it's frame-rate independent
      const decay = Math.pow(0.99, delta); // about 0.85 per 16ms
      velocity.current *= decay;
    } else {
      velocity.current = 0;
    }

    const baseSpeed = isHovered.current ? 0 : -9; // deg per sec
    const finalSpeed = baseSpeed + velocity.current;

    rotation.set(rotation.get() + (finalSpeed * (delta / 1000)));
  });

  const handlePan = (e, info) => {
    isDragging.current = true;
    rotation.set(rotation.get() + info.delta.x * 0.4);
  };

  const handlePanEnd = (e, info) => {
    isDragging.current = false;
    velocity.current = info.velocity.x * 0.4; // degrees per second
  };

  const handleFilter = (filter) => {
    setActiveFilter(filter);
  };

  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : 'unset';
  }, [selectedProject]);

  return (
    <section id="projects" className="projects carousel-section">
      <motion.div
        className="projects-container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
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

        {/* Carousel */}
        <div className="carousel-viewport">
          <div
            style={{
              transform: `translateZ(-${Math.max(400, (filteredProjects.length * 420) / (2 * Math.PI))}px)`,
              transformStyle: 'preserve-3d',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <motion.div
              className="carousel-track"
              onPan={handlePan}
              onPanEnd={handlePanEnd}
              onMouseEnter={() => (isHovered.current = true)}
              onMouseLeave={() => (isHovered.current = false)}
              style={{
                position: 'relative',
                width: '400px',
                height: '420px',
                transformStyle: 'preserve-3d',
                rotateY: rotation,
                willChange: 'transform'
              }}
            >
              {filteredProjects.map((project, index) => {
                const duration = 40;
                const angle = 360 / filteredProjects.length;
                const rotateY = index * angle;
                const radius = Math.max(400, (filteredProjects.length * 420) / (2 * Math.PI));
                const animationDelay = `-${index * (duration / filteredProjects.length)}s`;

                return (
                  <div
                    key={project.id}
                    className="carousel-card"
                    style={{
                      position: 'absolute',
                      top: 'calc(50% - 210px)',
                      left: 'calc(50% - 200px)',
                      transformOrigin: 'center center',
                      transform: `rotateY(${rotateY}deg) translateZ(${radius}px)`,
                      backfaceVisibility: 'hidden'
                    }}
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Card image */}
                    <div className="carousel-card__image">
                      <img
                        src={require(`../assets/${project.image}`)}
                        alt={project.title}
                        draggable={false}
                      />
                      <div className="carousel-card__image-gradient" />
                    </div>

                    {/* Card body */}
                    <div className="carousel-card__body">
                      <div className="carousel-card__header">
                        <h3>{project.title}</h3>
                        <div className="carousel-card__links">
                          {project.github && (
                            <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub" onClick={(e) => e.stopPropagation()}>
                              <FiGithub />
                            </a>
                          )}
                          {project.live && (
                            <a href={project.live} target="_blank" rel="noreferrer" aria-label="Live Demo" onClick={(e) => e.stopPropagation()}>
                              <FiExternalLink />
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="carousel-card__desc">{project.description}</p>
                      <div className="carousel-card__tags">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="project-modal-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={() => setSelectedProject(null)} aria-label="Close modal">
                <FiX size={24} />
              </button>
              <div className="modal-image-container">
                <img src={require(`../assets/${selectedProject.image}`)} alt={selectedProject.title} />
              </div>
              <div className="modal-info">
                <h3>{selectedProject.title}</h3>
                <p>{selectedProject.description}</p>
                <div className="modal-actions">
                  {selectedProject.live && (
                    <a href={selectedProject.live} target="_blank" rel="noreferrer" className="modal-link primary">
                      <FiExternalLink /> Live Demo
                    </a>
                  )}
                  {selectedProject.github && (
                    <a href={selectedProject.github} target="_blank" rel="noreferrer" className="modal-link secondary">
                      <FiGithub /> GitHub Repository
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;