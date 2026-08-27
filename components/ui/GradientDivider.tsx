export default function GradientDivider(): React.ReactElement {
  return (
    <div
      aria-hidden="true"
      className="mx-auto h-px max-w-5xl"
      style={{
        background:
          "linear-gradient(to right, transparent, rgba(34, 211, 238, 0.4) 30%, rgba(139, 92, 246, 0.4) 70%, transparent)",
      }}
    />
  );
}
