interface ScrollCueProps {
  label?: string;
  className?: string;
}

/** Recurring mono "scroll" cue that bobs gently. */
export default function ScrollCue({ label = 'SCROLL TO CONTINUE ↓', className = '' }: ScrollCueProps) {
  return (
    <span
      className={`label animate-cue-bob select-none ${className}`}
      aria-hidden="true"
    >
      {label}
    </span>
  );
}
