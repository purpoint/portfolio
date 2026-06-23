import { useState } from 'react';
import type { Project } from '../../data';
import ProjectPreview from './ProjectPreview';

/**
 * Pure-CSS phone mockup (iPhone-style). Shows the real screenshot if it
 * exists, otherwise a designed in-app preview tinted by the project accent.
 */
export default function DevicePhone({ project }: { project: Project }) {
  const { accent, image } = project;
  const [hasImage, setHasImage] = useState(true);

  return (
    <div
      className="relative aspect-[9/19] w-full max-w-[280px]"
      style={{ filter: `drop-shadow(0 30px 60px rgba(${accent.primary}, 0.32))` }}
    >
      <div
        className="relative h-full w-full rounded-[36px] border p-[6px]"
        style={{
          background: 'linear-gradient(180deg, #1d1b27, #0e0d15)',
          borderColor: 'rgba(255,255,255,0.1)',
          boxShadow:
            '0 50px 80px -30px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.4)',
        }}
      >
        {/* Side buttons */}
        <span
          className="absolute right-[-3px] top-[28%] h-12 w-[3px] rounded-r-md"
          style={{ background: 'linear-gradient(180deg,#2a2837,#1a1922)' }}
        />
        <span
          className="absolute left-[-3px] top-[18%] h-6 w-[3px] rounded-l-md"
          style={{ background: 'linear-gradient(180deg,#2a2837,#1a1922)' }}
        />
        <span
          className="absolute left-[-3px] top-[26%] h-10 w-[3px] rounded-l-md"
          style={{ background: 'linear-gradient(180deg,#2a2837,#1a1922)' }}
        />

        {/* Screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[30px] bg-[#0d0c14]">
          {/* Notch */}
          <span
            className="absolute left-1/2 top-2 z-20 flex h-5 w-20 -translate-x-1/2 items-center justify-center gap-2 rounded-full bg-black"
            aria-hidden="true"
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: `rgba(${accent.primary},0.6)` }} />
          </span>

          {/* In-app preview */}
          <ProjectPreview project={project} />

          {/* Real screenshot — drops in once you save it to /public */}
          {hasImage && (
            <img
              src={image}
              alt={`${project.name} screenshot`}
              loading="lazy"
              className="absolute inset-0 z-10 h-full w-full object-cover"
              onError={() => setHasImage(false)}
            />
          )}

          {/* Sheen */}
          <span
            className="pointer-events-none absolute inset-0 z-30"
            style={{
              background: `linear-gradient(115deg, transparent 40%, rgba(${accent.primary},0.1) 50%, transparent 60%)`,
            }}
            aria-hidden="true"
          />

          {/* Home indicator */}
          <span
            className="absolute bottom-2 left-1/2 z-30 h-1 w-20 -translate-x-1/2 rounded-full"
            style={{ background: 'rgba(255,255,255,0.4)' }}
          />
        </div>
      </div>
    </div>
  );
}
