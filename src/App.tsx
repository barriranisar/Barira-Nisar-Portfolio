import React, { useState, useEffect } from 'react';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { CanvasBackground } from './components/CanvasBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { DailyUISection } from './sections/DailyUISection';
import { Experience } from './sections/Experience';
import { Achievements } from './sections/Achievements';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { useSmoothScroll } from './hooks/useSmoothScroll';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // Activate Lenis smooth scrolling
  useSmoothScroll();

  // Active section scroll tracking
  useEffect(() => {
    const sectionIds = [
      'home',
      'about',
      'projects',
      'daily-ui',
      'experience',
      'achievements',
      'contact'
    ];

    let ticking = false;

    const determineActiveSection = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // When reaching near the bottom, activate contact
      if (scrollY + viewportHeight >= docHeight - 70) {
        setActiveSection('contact');
        return;
      }

      // Focal evaluation point positioned at 28% viewport height
      const focalPoint = scrollY + viewportHeight * 0.28;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (focalPoint >= top) {
            setActiveSection(id);
            return;
          }
        }
      }

      setActiveSection('home');
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          determineActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    determineActiveSection();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <>
      {/* Intro Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Desktop Custom Follower Cursor */}
      <CustomCursor />

      {/* Ambient Interactive Particle Canvas Background */}
      <CanvasBackground />

      <div className="relative min-h-screen text-[#f3f4f8] bg-[#07040e]">
        {/* Floating Dynamic Navbar */}
        <Navbar activeSection={activeSection} onSectionSelect={setActiveSection} />

        {/* Sections */}
        <main>
          <Hero />
          <About />
          <Projects />
          <DailyUISection />
          <Experience />
          <Achievements />
          <Contact />
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </>
  );
};

export default App;
