import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin once for the whole app.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
