import React from "react";
import {
  DiJavascript1,
  DiPhp,
  DiLaravel,
  DiReact,
  DiHtml5,
  DiCss3,
  DiNodejs,
  DiPython,
  DiGit
} from "react-icons/di";
import "../styles/Slider.css";

const Slider = () => {
  const technologies = [
    { name: "JavaScript", icon: <DiJavascript1 /> },
    { name: "PHP", icon: <DiPhp /> },
    { name: "Laravel", icon: <DiLaravel /> },
    { name: "React", icon: <DiReact /> },
    { name: "HTML5", icon: <DiHtml5 /> },
    { name: "CSS3", icon: <DiCss3 /> },
    { name: "Node.js", icon: <DiNodejs /> },
    { name: "Python", icon: <DiPython /> },
    { name: "Git", icon: <DiGit /> }
  ];

  return (
    <div
      className="slider"
      style={{
        "--width": "120px",
        "--height": "120px",
        "--quantity": technologies.length
      }}
    >
      <div className="list">
        {technologies.map((tech, index) => (
          <div
            className="item"
            key={tech.name}
            style={{ "--position": index + 1 }}
            title={tech.name}
          >
            <div className="icon-container">
              {tech.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;