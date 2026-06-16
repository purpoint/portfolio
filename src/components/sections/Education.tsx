import { education } from '../../data';
import Reveal from '../Reveal';
import CountUp from '../CountUp';

export default function Education() {
  return (
    <section id="education" className="section-pad relative">
      <div className="container-rail">
        <Reveal as="p" className="eyebrow mb-14">
          {education.eyebrow}
        </Reveal>

        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Left — the institution */}
          <Reveal stagger={0.1}>
            <h2 className="font-display text-[clamp(34px,5vw,68px)] leading-[0.95] text-ink">
              {education.school}
            </h2>
            <p className="mono mt-6 text-molten-amber/90">{education.degree}</p>
            <p className="mono mt-2 text-ink-muted">
              {education.dates} · {education.location}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {education.coursework.map((c) => (
                <span key={c} className="chip">
                  {c}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Right — the giant molten CGPA, counting up on scroll */}
          <div className="flex flex-col items-start lg:items-end">
            <div className="flex items-end gap-4">
              <CountUp
                value={education.cgpaValue}
                decimals={1}
                duration={2}
                className="text-molten font-display text-[clamp(96px,17vw,260px)] leading-[0.8]"
              />
              <span className="mono mb-4 text-ink-muted lg:mb-6">{education.cgpaMax}</span>
            </div>
            <Reveal as="p" delay={0.3} className="mono mt-4 text-molten-ember lg:text-right">
              {education.cgpaTag}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
