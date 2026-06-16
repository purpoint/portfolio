import { skills } from '../../data';
import Reveal from '../Reveal';
import Marquee from '../Marquee';

// Flatten every skill into one list for the decorative marquee band.
const allSkills = skills.groups.flatMap((g) => g.items);

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden section-pad">
      <div className="container-rail">
        <Reveal as="p" className="eyebrow mb-14">
          {skills.eyebrow}
        </Reveal>

        <div className="grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {skills.groups.map((group) => (
            <div key={group.label} className="border-t border-hairline pt-6">
              <h3 className="mono mb-5 text-molten-amber/90">{group.label}</h3>
              <Reveal stagger={0.06} className="flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </Reveal>
            </div>
          ))}
        </div>
      </div>

      {/* Slow marquee band for extra motion */}
      <div className="mt-24">
        <Marquee items={allSkills} />
      </div>
    </section>
  );
}
