import { about } from '../../data';
import WordReveal from '../WordReveal';
import Reveal from '../Reveal';

export default function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="container-rail">
        <Reveal as="p" className="eyebrow mb-14">
          {about.eyebrow}
        </Reveal>

        <div className="grid gap-16 lg:grid-cols-[1fr_300px] lg:gap-20">
          {/* Editorial statement that lights up word-by-word on scroll */}
          <WordReveal
            text={about.statement}
            className="max-w-4xl font-body text-[clamp(24px,3.2vw,42px)] font-medium leading-[1.3] tracking-tight text-ink"
          />

          {/* Mono fact column, fading + rising in sequence */}
          <Reveal
            as="ul"
            stagger={0.12}
            className="flex flex-col gap-5 self-end border-l border-hairline pl-7"
          >
            {about.facts.map((fact) => (
              <li key={fact} className="mono flex items-center gap-3 text-ink/80">
                <span className="h-1.5 w-1.5 rounded-full bg-molten-amber" aria-hidden="true" />
                {fact}
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
