import Image from "next/image";

interface LogoProps {
  variant: "horizontal" | "stacked" | "mark";
  className?: string;
}

const CONFIG = {
  horizontal: {
    src: "/brand/horizontal-lockup.svg",
    width: 160,
    height: 40,
    alt: "Maser Labs",
  },
  stacked: {
    src: "/brand/stacked-lockup.svg",
    width: 120,
    height: 120,
    alt: "Maser Labs",
  },
  mark: {
    src: "/brand/mark.svg",
    width: 36,
    height: 36,
    alt: "Maser Labs",
  },
} as const;

export default function Logo({
  variant,
  className = "",
}: LogoProps): React.ReactElement {
  const { src, width, height, alt } = CONFIG[variant];

  return (
    <a href="/" className={`inline-block ${className}`} style={{ padding: variant === "mark" ? 4 : 8 }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        className="h-auto"
        style={{ width: width, height: "auto" }}
      />
    </a>
  );
}
