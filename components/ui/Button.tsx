import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "default" | "lg";
  href?: string;
}

const BASE_CLASSES =
  "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base disabled:opacity-50 disabled:pointer-events-none";

const VARIANT_CLASSES = {
  primary:
    "bg-gradient-to-r from-accent-cyan to-accent-purple text-bg-base hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(34,211,238,0.3)]",
  secondary:
    "border border-border-subtle text-text-primary hover:border-accent-cyan/40 hover:shadow-[0_0_16px_rgba(34,211,238,0.1)]",
} as const;

const SIZE_CLASSES = {
  default: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
} as const;

export default function Button({
  variant = "primary",
  size = "default",
  href,
  children,
  className = "",
  ...props
}: ButtonProps): React.ReactElement {
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
