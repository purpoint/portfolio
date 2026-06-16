import type { Project } from '../../data';
import Reveal from '../Reveal';
import ProjectMedia from './ProjectMedia';

interface ProjectPanelProps {
  project: Project;
  layout: 'horizontal' | 'vertical';
}

/** External-link button. Hidden entirely when no URL is set. */
function LinkButton({
  href,
  children,
  variant,
}: {
  href: string;
  children: React.ReactNode;
  variant: 'molten' | 'ghost';
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={variant === 'molten' ? 'btn-molten' : 'btn-ghost'}
    >
      {children}
    </a>
  );
}

export default function ProjectPanel({ project, layout }: ProjectPanelProps) {
  const horizontal = layout === 'horizontal';

  return (
    <article
      className={
        horizontal
          ? 'work-panel relative flex h-screen w-screen flex-shrink-0 items-center px-6 sm:px-12 lg:px-20'
          : 'work-panel relative scroll-mt-24'
      }
    >
      {/* Per-panel heat glow */}
      <div
        className="pointer-events-none absolute blur-3xl"
        style={{
          inset: horizontal ? '15% 20%' : '0',
          background: `radial-gradient(60% 60% at 60% 40%, rgba(${project.glow},0.18), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div
        className={`container-rail relative z-10 grid items-center gap-10 lg:gap-16 ${
          horizontal ? 'lg:grid-cols-[0.92fr_1.08fr]' : 'lg:grid-cols-2'
        }`}
      >
        {/* ---- Text column ---- */}
        <div className={horizontal ? '' : 'order-2 lg:order-1'}>
          <Reveal stagger={0.08}>
            <span className="mono text-molten-amber/80">{project.index} / SELECTED WORK</span>
            <h3 className="mt-3 font-display text-[clamp(40px,6vw,96px)] leading-[0.9] text-ink">
              {project.name}
            </h3>
            <p className="mt-3 text-lg text-ink/75 sm:text-xl">{project.tagline}</p>
          </Reveal>

          {/* Stack chips */}
          <div className="mt-7 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="mono rounded-full border border-hairline px-3 py-1.5 text-[11px] text-ink-muted"
              >
                {s}
              </span>
            ))}
          </div>

          {/* Bullets */}
          <ul className="mt-7 flex flex-col gap-3.5">
            {project.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-ink/80">
                <span
                  className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ background: `rgb(${project.glow})` }}
                  aria-hidden="true"
                />
                {b}
              </li>
            ))}
          </ul>

          {/* Molten metric stats */}
          <Reveal stagger={0.12} className="mt-9 flex flex-wrap gap-x-10 gap-y-5">
            {project.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-molten font-display text-[clamp(28px,3.4vw,46px)] leading-none">
                  {stat.value}
                </div>
                <div className="mono mt-2 text-ink-muted">{stat.label}</div>
              </div>
            ))}
          </Reveal>

          {/* Buttons */}
          <div className="mt-9 flex flex-wrap gap-4">
            <LinkButton href={project.live} variant="molten">
              Live demo ↗
            </LinkButton>
            <LinkButton href={project.code} variant="ghost">
              View code →
            </LinkButton>
          </div>
        </div>

        {/* ---- Media column ---- */}
        <div className={horizontal ? '' : 'order-1 lg:order-2'}>
          <ProjectMedia image={project.image} name={project.name} glow={project.glow} />
        </div>
      </div>
    </article>
  );
}
