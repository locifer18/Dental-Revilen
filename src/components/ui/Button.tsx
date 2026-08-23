"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "gold" | "ghost" | "link" | "glass" | "glass-dark";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  external?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      href,
      external,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium tracking-tight transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer rounded-full overflow-hidden";

    const sizeStyles = {
      sm: "text-xs px-4 py-2 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-[0.9rem] px-7 py-3.5 gap-2.5 font-medium tracking-wide",
      xl: "text-base px-9 py-[1.125rem] gap-3 font-semibold tracking-wide",
    };

    const variantStyles = {
      primary:
        "bg-pine-800 text-ivory-50 hover:bg-pine-900 shadow-subtle hover:shadow-elevated hover:-translate-y-0.5 after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-b after:from-white/10 after:to-transparent after:rounded-full",
      secondary:
        "bg-stone-100 text-charcoal-900 hover:bg-stone-200 border border-stone-300/60 hover:-translate-y-0.5 hover:shadow-soft",
      outline:
        "border border-pine-800/40 text-pine-900 hover:bg-pine-800 hover:text-ivory-50 hover:border-pine-800 hover:-translate-y-0.5 hover:shadow-subtle",
      gold:
        "bg-[linear-gradient(135deg,#C5A880_0%,#E8D5B0_40%,#C5A880_70%,#A8895F_100%)] text-charcoal-950 font-semibold shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5 after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.35)_50%,transparent_60%)] after:bg-[length:200%_100%] after:rounded-full hover:after:animate-shimmer",
      ghost:
        "text-charcoal-800 hover:bg-stone-200/60 hover:text-pine-900",
      link:
        "text-pine-800 hover:text-pine-950 underline-offset-4 hover:underline p-0 h-auto rounded-none",
      glass:
        "glass-apple text-charcoal-900 hover:bg-white/80 shadow-glass hover:-translate-y-0.5 after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.3)_50%,transparent_60%)] after:bg-[length:200%_100%] after:rounded-full hover:after:animate-shimmer",
      "glass-dark":
        "glass-apple-dark text-ivory-100 hover:bg-white/10 shadow-glass-dark border border-white/10 hover:-translate-y-0.5 after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.12)_50%,transparent_60%)] after:bg-[length:200%_100%] after:rounded-full hover:after:animate-shimmer",
    };

    const combinedClassName = cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      className
    );

    const inner = (
      <>
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0 relative z-10" />
        ) : (
          leftIcon && <span className="shrink-0 relative z-10">{leftIcon}</span>
        )}
        <span className="relative z-10">{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0 relative z-10">{rightIcon}</span>}
      </>
    );

    if (href) {
      if (external) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClassName}>
            {inner}
          </a>
        );
      }
      return <Link href={href} className={combinedClassName}>{inner}</Link>;
    }

    return (
      <button ref={ref} disabled={disabled || isLoading} className={combinedClassName} {...props}>
        {inner}
      </button>
    );
  }
);

Button.displayName = "Button";
