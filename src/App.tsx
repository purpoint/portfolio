import { useLenis } from './hooks/useLenis';
import Nav from './components/Nav';
import ScrollProgress from './components/ScrollProgress';
import GrainOverlay from './components/GrainOverlay';
import Hero from './components/sections/Hero';

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
        {/* Sections are added section-by-section:
            About · Education · Skills · Work · Contact */}
      </main>
    </>
  );
}
