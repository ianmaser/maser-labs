interface GhostWordmarkProps {
  className?: string;
}

export default function GhostWordmark({
  className = "",
}: GhostWordmarkProps): React.ReactElement {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-hidden ${className}`}
    >
      <p className="whitespace-nowrap text-center text-[clamp(3rem,10vw,7rem)] font-black uppercase leading-none tracking-widest" style={{ color: 'rgba(245, 247, 250, 0.03)' }}>
        MASER LABS
      </p>
    </div>
  );
}
