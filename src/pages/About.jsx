import React from 'react';
function Education() {
  return (
    <section className="educationcontainer-fluid py-5">
      <div className='comtent-info form-signin w-100 m-auto'>
        <h2>Education</h2>
        <ul>
          <li>
            <strong>Specialized Technician in Digital Development</strong><br />
            Institut Spécialisé de Technologie Appliquée NTIC Sidi Youssef Ben Ali Marrakech, 2023 - Present
          </li>
          <li>
            <strong>Baccalauréat</strong><br />
            Lycée Zineb El Nafzaouiya, 2022/2023
          </li>
        </ul>
      </div>
    </section>
  );
}
function About() {
  return (
    <div>
    <section className="about container-fluid py-5">
      <div className='comtent-about form-signin w-100 m-auto'>
      <div className="text-content col-6 col-md-4">
          <h2 className="mb-4">About Me</h2>
          <p>
            I am currently pursuing a specialized technician degree in digital development (full-stack)  <br />
            at the Institut Spécialisé de Technologie Appliquée NTIC Sidi Youssef Ben Ali Marrakech.  <br />
            I thrive on learning and building innovative solutions that bring ideas to life on the web.
          </p>
        </div>
      </div>

    </section>
      <div className='comtent-about about form-signin w-100 m-auto'>
      <div className="text-content col-6 col-md-4">
          <h2 className="mb-4">My Journey</h2>
          <p>My journey in the tech world began with a curiosity for how  <br />
            websites work behind the scenes. Over time, I have honed my  <br />
            skills in both front-end and back-end development,  <br />
            allowing me to craft seamless, user-friendly experiences  <br />
            powered by robust and efficient back-end systems. <br /><br/>

            Currently, I’m focused on mastering dynamic web technologies and database  <br />
            management, as well as exploring the latest trends in web development to  <br />
            stay ahead in this ever-evolving field. <br />
          </p>
        </div>
        <div>
      <h2>Education</h2>
      <ul>
        <li>
          <strong>Specialized Technician in Digital Development</strong><br />
          Institut Spécialisé de Technologie Appliquée NTIC Sidi Youssef Ben Ali Marrakech, 2023 - Present
        </li>
        <li>
          <strong>Baccalauréat</strong><br />
          Lycée Zineb El Nafzaouiya, 2022/2023
        </li>
      </ul>
      </div>
      </div>
      </div>
  );
}

export default About;
