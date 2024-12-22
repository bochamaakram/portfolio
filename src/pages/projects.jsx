import React from 'react';

function Projects() {
  return (
    <section className="projects container-fluid py-5 ">
        <div className="card">
          <h5 class="card__title">Irshade.com</h5>
          <p className="card__content">
            a comprehensive platform designed to help users deepen their understanding of Islam.
          </p>
          <a href="http://irshade.wuaze.com/" className="btn btn-primary button-link">View Project</a>
          <a href="https://github.com/bochamaakram/project-ajile" className="btn btn-primary button-link">Project in Github</a>
        </div>

        <div className="card">
          <h5 class="card__title">Prayer Times App</h5>
          <p className="card__content">
          a React application that provides daily prayer times for selected cities. in a clean and responsive design.
          </p>
          <a href="https://github.com/bochamaakram/project-ajile" className="btn btn-primary button-link">Project in Github</a>
        </div>
        
        
        <div className="card">
          <h5 class="card__title">to-do list</h5>
          <p className="card__content">
          just simple to-do list where the user can Add a Task or Delete a Task.
          </p>
          <a href="https://github.com/bochamaakram/To-Do-List" className="btn btn-primary button-link">Project in Github</a>
        </div>
    </section>
  );
}

export default Projects;
