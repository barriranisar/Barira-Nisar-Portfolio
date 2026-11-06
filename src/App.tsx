import React, { useState, useEffect, Suspense } from 'react';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { CanvasBackground } from './components/CanvasBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { TechMarquee } from './components/TechMarquee';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Footer } from './sections/Footer';
import { useSmoothScroll } from './hooks/useSmoothScroll';

// Lazy-load heavy below-the-fold sections
const DailyUISection = React.lazy(() =>
  import('./sections/DailyUISection').then((m) => ({ default: m.DailyUISection }))
);
const Achievements = React.lazy(() =>
  import('./sections/Achievements').then((m) => ({ default: m.Achievements }))
);
const Contact = React.lazy(() =>
  import('./sections/Contact').then((m) => ({ default: m.Contact }))
);

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Activate Lenis smooth scrolling
  useSmoothScroll();

  // Active section scroll tracking & scroll progress calculation
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

    const determineActiveSectionAndProgress = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const maxScroll = Math.max(docHeight - viewportHeight, 1);

      // Normalized 0 to 1 progress across full document
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      setScrollProgress(progress);

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
          determineActiveSectionAndProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    determineActiveSectionAndProgress();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  // Two core discipline colors:
  // Data Science = #06b6d4, Web Engineering = #8b5cf6
  const getDisciplineColor = (section: string): string => {
    switch (section) {
      case 'experience':
      case 'achievements':
        return '#06b6d4';
      case 'projects':
      case 'daily-ui':
      case 'about':
      case 'contact':
      default:
        return '#8b5cf6';
    }
  };

  const activeColor = getDisciplineColor(activeSection);

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
          <Hero accentColor={activeColor} scrollProgress={scrollProgress} />
          <TechMarquee />
          <About />
          <Projects />
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <DailyUISection />
          </Suspense>
          <Experience />
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <Achievements />
          </Suspense>
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <Contact />
          </Suspense>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </>
  );
};

export default App;
