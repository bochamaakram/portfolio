import React, { useState } from 'react';
import { BrowserRouter as  Router, Routes, Route, Link  } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/projects';
import Contact from './pages/Contact';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
        <footer className="footer">
          <p>&copy; 2024 Akram Bouchama. All Rights Reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;