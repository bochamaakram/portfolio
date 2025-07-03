import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/3dLoader';
import { Analytics } from "@vercel/analytics/react"
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (remove in production)
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark' : ''}`}>
        <Analytics/>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;