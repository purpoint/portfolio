interface ScrollCueProps {
  label?: string;
  className?: string;
}

/** Recurring mono "scroll" cue that bobs gently. */
export default function ScrollCue({ label = 'SCROLL TO CONTINUE ↓', className = '' }: ScrollCueProps) {
  return (
    <span
      className={`mono animate-cue-bob select-none text-ink-muted ${className}`}
      aria-hidden="true"
    >
      {label}
    </span>
  );
}
