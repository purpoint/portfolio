import { useLenis } from './hooks/useLenis';
import Nav from './components/Nav';
import ScrollProgress from './components/ScrollProgress';
import GrainOverlay from './components/GrainOverlay';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Education from './components/sections/Education';
import Skills from './components/sections/Skills';

export default function App() {
  // Boot Lenis inertia smooth-scroll (auto-disabled for reduced motion).
  useLenis();

  return (
    <>
      {/* Page-wide atmosphere */}
      <ScrollProgress />
      <GrainOverlay />
      <Nav />

      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        {/* Sections are added section-by-section:
            Work · Contact */}
      </main>
    </>
  );
}
