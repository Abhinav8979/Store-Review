import React from "react";
import clsx from "clsx";
import type {
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from "../types/ui/button.types";

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "rounded-lg font-semibold transition focus:outline-none focus:ring-2 cursor-pointer";

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-[var(--primary)] text-white hover:opacity-90 focus:ring-[var(--primary)]",
    secondary:
      "bg-[var(--secondary)] text-[var(--text-primary)] hover:opacity-90 focus:ring-[var(--secondary)]",
    accent:
      "bg-[var(--accent)] text-[var(--text-primary)] hover:opacity-90 focus:ring-[var(--accent)]",
    outline:
      "bg-transparent text-[var(--primary)] border border-[var(--primary)] hover:bg-[var(--secondary)] focus:ring-[var(--primary)]",
    ghost: "bg-transparent text-[var(--primary)]",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
