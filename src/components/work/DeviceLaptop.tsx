import { useState } from 'react';
import type { Project } from '../../data';
import ProjectPreview from './ProjectPreview';

/**
 * Pure-CSS laptop mockup. Shows the project's real screenshot if it exists
 * (public/projects/*.png), otherwise renders a designed in-app preview that
 * looks like the project — never a placeholder of giant clipped text.
 */
export default function DeviceLaptop({ project }: { project: Project }) {
  const { accent, image, id } = project;
  const [hasImage, setHasImage] = useState(true);

  return (
    <div
      className="relative w-full max-w-[680px]"
      style={{ filter: `drop-shadow(0 30px 60px rgba(${accent.primary}, 0.32))` }}
    >
      {/* Lid */}
      <div
        className="rounded-[14px_14px_5px_5px] border p-[10px_12px_0]"
        style={{
          background: '#1c1a26',
          borderColor: 'rgba(255,255,255,0.1)',
          boxShadow: '0 50px 80px -30px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.07)',
        }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 rounded-t-md border-b border-white/[0.06] bg-[#0a0a10] px-2.5 py-1.5">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span
            className="ml-3 rounded-[5px] bg-white/[0.05] px-2.5 py-0.5 font-mono text-[9.5px]"
            style={{ color: `rgba(${accent.primary}, 0.85)` }}
          >
            {id}.app
          </span>
        </div>

        {/* Screen */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#0d0c14]">
          {/* In-app preview (always rendered; image layers above if present) */}
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
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              background: `linear-gradient(115deg, transparent 40%, rgba(${accent.primary},0.08) 50%, transparent 60%)`,
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Base */}
      <div
        className="relative mx-auto -mt-[2px] h-2 w-[62%] rounded-b-[12px]"
        style={{ background: 'linear-gradient(180deg, #2a2837, #14131c)' }}
      >
        <span
          className="absolute left-1/2 top-0 h-[3px] w-[60px] -translate-x-1/2 rounded-b-[6px]"
          style={{ background: 'rgba(0,0,0,0.4)' }}
        />
      </div>
    </div>
  );
}
