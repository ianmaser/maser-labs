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
      <p className="whitespace-nowrap text-center text-[clamp(4rem,15vw,12rem)] font-black uppercase leading-none tracking-widest text-text-primary/[0.03]">
        MASER LABS
      </p>
    </div>
  );
}
