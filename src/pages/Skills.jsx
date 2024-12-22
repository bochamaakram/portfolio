import React from 'react';

function Skills() {
  return (
    <section className="skills container-fluid py-5 ">
      <div class="card">
        <span class="card__title">programing languages:</span>
              <ul class="card__content">
                <li className='list-item'>HTML5 (Bootstrap)</li>
                <li className='list-item'>CSS3</li>
                <li className='list-item'>PHP (Laravel)</li>
                <li className='list-item'>JavaScript (React.js)</li>
                <li className='list-item'>Python</li>
              </ul>
      </div>
      <div class="card">
        <span class="card__title">Tools</span>
              <ul class="card__content">
                <li className='list-item'>Git/Github</li>
                <li className='list-item'>VS Code</li>
                <li className='list-item'>Postman</li>
                <li className='list-item'>Figma</li>
              </ul>
      </div>
      <div class="card">
        <span class="card__title">Databases</span>
              <ul class="card__content">
                <li className='list-item'>MongoDB</li>
                <li className='list-item'>MySQL</li>
              </ul>
      </div>
    </section>
  );
}

export default Skills;