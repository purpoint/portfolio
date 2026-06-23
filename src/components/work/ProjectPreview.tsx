import type { Project, ProjectAccent } from '../../data';

interface PreviewProps {
  project: Project;
}

/**
 * Stylized mini in-app UI rendered inside the device mockup. Each project
 * gets its own designed preview tinted by its accent. Real screenshots
 * (public/projects/*.png) layer on top via the device's <img>.
 */
export default function ProjectPreview({ project }: PreviewProps) {
  switch (project.id) {
    case 'collabboard':
      return <CollabBoardPreview a={project.accent} />;
    case 'wasteiq':
      return <WasteIQPreview a={project.accent} />;
    case 'mindvault':
      return <MindVaultPreview a={project.accent} />;
    case 'echovision':
      return <EchoVisionPreview a={project.accent} />;
    default:
      return null;
  }
}

/* ───────── CollabBoard ───────── */
function CollabBoardPreview({ a }: { a: ProjectAccent }) {
  return (
    <div className="absolute inset-0 flex bg-[#0d0c14]">
      <div className="flex w-[12%] flex-col items-center gap-1.5 border-r border-white/[0.04] p-1.5">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className="block aspect-square w-full rounded"
            style={{ background: i === 0 ? `rgba(${a.primary},0.55)` : 'rgba(255,255,255,0.06)' }}
          />
        ))}
      </div>
      <div className="relative flex-1">
        <svg viewBox="0 0 320 200" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="cb-bg" cx="50%" cy="40%" r="60%">
              <stop offset="0" stopColor="#1a1828" />
              <stop offset="1" stopColor="#0d0c14" />
            </radialGradient>
          </defs>
          <rect width="320" height="200" fill="url(#cb-bg)" />
          <path
            d="M30,140 C70,90 110,160 150,110 S230,60 290,100"
            fill="none"
            stroke={a.dot}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M50,80 C90,100 120,60 170,90 S240,130 290,80"
            fill="none"
            stroke={`rgb(${a.secondary})`}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="80" cy="50" r="14" fill="none" stroke="#ff7ad9" strokeWidth="2" />
          <rect x="190" y="40" width="60" height="38" rx="4" fill="none" stroke="#ff7ad9" strokeWidth="2" />
          <circle cx="195" cy="160" r="4" fill={a.dot} />
          <text x="202" y="164" fill="rgba(255,255,255,0.7)" fontFamily="JetBrains Mono, monospace" fontSize="9">
            Manan
          </text>
          <circle cx="36" cy="84" r="4" fill={`rgb(${a.secondary})`} />
          <text x="44" y="88" fill="rgba(255,255,255,0.6)" fontFamily="JetBrains Mono, monospace" fontSize="9">
            Sarah
          </text>
        </svg>
      </div>
    </div>
  );
}

/* ───────── WasteIQ ───────── */
function WasteIQPreview({ a }: { a: ProjectAccent }) {
  return (
    <div className="absolute inset-0 flex bg-[#0d0c14] text-white">
      {/* Sidebar */}
      <div className="flex w-[18%] flex-col gap-2 border-r border-white/[0.04] p-2">
        <span className="h-2 w-10 rounded bg-white/15" />
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="flex items-center gap-1.5 rounded px-1 py-1"
            style={{ background: i === 1 ? `rgba(${a.primary},0.18)` : 'transparent' }}
          >
            <span
              className="h-1.5 w-1.5 rounded-sm"
              style={{ background: i === 1 ? a.dot : 'rgba(255,255,255,0.25)' }}
            />
            <span className="h-1 flex-1 rounded bg-white/10" />
          </span>
        ))}
      </div>
      <div className="flex-1 p-3">
        <div className="mb-3 flex items-center justify-between">
          <span className="h-2 w-16 rounded bg-white/20" />
          <span
            className="rounded-md px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-widest"
            style={{ background: `rgba(${a.primary},0.18)`, color: a.dot }}
          >
            Live
          </span>
        </div>
        <div className="mb-3 grid grid-cols-3 gap-1.5">
          {['230', '12%', '$2.4k'].map((v, i) => (
            <div key={i} className="rounded-md border border-white/[0.06] bg-white/[0.03] p-1.5">
              <div className="text-[11px] font-semibold leading-none">{v}</div>
              <div className="mt-1 h-1 w-6 rounded bg-white/10" />
            </div>
          ))}
        </div>
        <div className="rounded-md border border-white/[0.06] bg-white/[0.025] p-2">
          <svg viewBox="0 0 220 70" className="h-[68px] w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="wi-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={`rgb(${a.primary})`} stopOpacity="0.5" />
                <stop offset="1" stopColor={`rgb(${a.primary})`} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,52 L30,44 L60,48 L90,30 L120,36 L150,18 L180,24 L220,8 L220,70 L0,70 Z"
              fill="url(#wi-area)"
            />
            <path
              d="M0,52 L30,44 L60,48 L90,30 L120,36 L150,18 L180,24 L220,8"
              fill="none"
              stroke={a.dot}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ───────── MindVault ───────── */
function MindVaultPreview({ a }: { a: ProjectAccent }) {
  return (
    <div className="absolute inset-0 flex bg-[#0d0c14] text-white">
      {/* PDF sidebar */}
      <div className="flex w-[24%] flex-col gap-1.5 border-r border-white/[0.05] p-2">
        <span className="mb-1 h-2 w-14 rounded bg-white/15" />
        {['report.pdf', 'notes.pdf', 'paper.pdf', 'index.pdf'].map((n, i) => (
          <div
            key={n}
            className="flex items-center gap-1.5 rounded p-1"
            style={{ background: i === 0 ? `rgba(${a.primary},0.18)` : 'transparent' }}
          >
            <span
              className="h-3 w-2.5 flex-shrink-0 rounded-sm"
              style={{ background: i === 0 ? a.dot : 'rgba(255,255,255,0.18)' }}
            />
            <span className="truncate text-[8.5px] text-white/70">{n}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col p-2">
        <div className="flex-1 space-y-2 overflow-hidden">
          <div className="ml-auto max-w-[75%] rounded-md rounded-tr-sm p-1.5" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <span className="block h-1 w-20 rounded bg-white/30" />
            <span className="mt-1 block h-1 w-14 rounded bg-white/20" />
          </div>
          <div
            className="max-w-[80%] rounded-md rounded-tl-sm p-1.5"
            style={{ background: `rgba(${a.primary},0.16)`, border: `1px solid rgba(${a.primary},0.3)` }}
          >
            <span className="block h-1 w-24 rounded" style={{ background: a.dot, opacity: 0.7 }} />
            <span className="mt-1 block h-1 w-20 rounded bg-white/25" />
            <span className="mt-1 block h-1 w-16 rounded bg-white/20" />
            <div className="mt-2 flex gap-1">
              <span
                className="rounded-full px-1.5 py-[1px] font-mono text-[7px]"
                style={{ background: `rgba(${a.primary},0.22)`, color: a.dot }}
              >
                report.pdf
              </span>
              <span
                className="rounded-full px-1.5 py-[1px] font-mono text-[7px]"
                style={{ background: `rgba(${a.primary},0.22)`, color: a.dot }}
              >
                p.12
              </span>
            </div>
          </div>
          <div className="ml-auto max-w-[60%] rounded-md rounded-tr-sm p-1.5" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <span className="block h-1 w-12 rounded bg-white/30" />
          </div>
        </div>
        <div
          className="mt-1.5 flex items-center gap-1.5 rounded-md border p-1.5"
          style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.025)' }}
        >
          <span className="h-1 flex-1 rounded bg-white/15" />
          <span
            className="h-3 w-3 rounded"
            style={{ background: `linear-gradient(135deg, rgb(${a.primary}), rgb(${a.secondary}))` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ───────── EchoVision (phone) ───────── */
function EchoVisionPreview({ a }: { a: ProjectAccent }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-between bg-[#0d0c14] px-3 pb-4 pt-9 text-center text-white">
      {/* Status */}
      <span className="font-mono text-[8px] uppercase tracking-[0.18em]" style={{ color: a.dot }}>
        ● Listening
      </span>

      {/* Mic with pulsing rings */}
      <div className="relative grid place-items-center">
        <span
          className="absolute h-24 w-24 rounded-full opacity-30"
          style={{ background: `radial-gradient(circle, rgba(${a.primary},0.7), transparent 70%)` }}
        />
        <span
          className="absolute h-16 w-16 rounded-full border-2"
          style={{ borderColor: `rgba(${a.primary},0.4)` }}
        />
        <span
          className="absolute h-12 w-12 rounded-full border-2"
          style={{ borderColor: `rgba(${a.primary},0.6)` }}
        />
        <span
          className="relative grid h-10 w-10 place-items-center rounded-full"
          style={{
            backgroundImage: `linear-gradient(135deg, rgb(${a.primary}), rgb(${a.secondary}))`,
            boxShadow: `0 8px 24px -6px rgba(${a.primary},0.7)`,
          }}
        >
          {/* mic glyph */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
            <rect x="9" y="3" width="6" height="12" rx="3" />
            <path d="M5 11a7 7 0 0 0 14 0" />
            <line x1="12" y1="18" x2="12" y2="22" />
          </svg>
        </span>
      </div>

      {/* Transcribed text */}
      <div className="w-full space-y-1.5 text-left">
        <span className="block h-1.5 w-3/4 rounded bg-white/30" />
        <span className="block h-1.5 w-5/6 rounded bg-white/25" />
        <span className="block h-1.5 w-2/3 rounded bg-white/20" />
        <span
          className="mt-2 inline-block rounded-md px-2 py-1 font-mono text-[8px]"
          style={{ background: `rgba(${a.primary},0.18)`, color: a.dot }}
        >
          Describing scene…
        </span>
      </div>
    </div>
  );
}
