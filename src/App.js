import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/3dLoader';
import CustomCursor from './components/CustomCursor';
import Globe3D from './components/Globe3D';
import ScrollReveal from './components/ScrollReveal';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <Router>
      <CustomCursor />
      {/* Global 3D Globe Background */}
      <Globe3D />
      <div className="app">
        <Header />
        <main>
          <Hero />
          <ScrollReveal>
            <About />
          </ScrollReveal>
          <ScrollReveal>
            <Skills />
          </ScrollReveal>
          <ScrollReveal>
            <Projects />
          </ScrollReveal>
          <ScrollReveal>
            <Contact />
          </ScrollReveal>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;