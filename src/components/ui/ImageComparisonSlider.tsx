"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ImageComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: "16/9" | "4/3" | "3/2" | "1/1";
  className?: string;
  initialPosition?: number;
}

export function ImageComparisonSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before dental treatment",
  afterAlt = "After dental treatment",
  beforeLabel = "Before",
  afterLabel = "After Result",
  aspectRatio = "16/9",
  className,
  initialPosition = 50,
}: ImageComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let percentage = (x / rect.width) * 100;
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPosition((prev) => Math.max(prev - 5, 0));
    } else if (e.key === "ArrowRight") {
      setSliderPosition((prev) => Math.min(prev + 5, 100));
    } else if (e.key === "Home") {
      setSliderPosition(0);
    } else if (e.key === "End") {
      setSliderPosition(100);
    }
  };

  const aspectStyles = {
    "16/9": "aspect-[16/9]",
    "4/3": "aspect-[4/3]",
    "3/2": "aspect-[3/2]",
    "1/1": "aspect-square",
  };

  return (
    <div
      ref={containerRef}
      role="slider"
      aria-label="Before and after comparison slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPosition)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        if (e.touches.length > 0) {
          handleMove(e.touches[0].clientX);
        }
      }}
      className={cn(
        "relative w-full overflow-hidden rounded-3xl cursor-ew-resize select-none shadow-elevated border border-stone-200/80 bg-stone-900 group focus:outline-none focus-visible:ring-4 focus-visible:ring-pine-500/50",
        aspectStyles[aspectRatio],
        className
      )}
    >
      {/* After Image (Full Base Background) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={afterImage}
          alt={afterAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
          className="object-cover"
          priority
        />
        {/* After Label Badge */}
        <div className="absolute bottom-4 right-4 bg-pine-900/85 backdrop-blur-md text-ivory-50 text-xs px-3 py-1.5 rounded-full font-medium tracking-wide border border-pine-700/50 shadow-soft pointer-events-none">
          {afterLabel}
        </div>
      </div>

      {/* Before Image (Clipped Left Side) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={beforeAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
          className="object-cover"
          priority
        />
        {/* Before Label Badge */}
        <div className="absolute bottom-4 left-4 bg-charcoal-900/85 backdrop-blur-md text-ivory-50 text-xs px-3 py-1.5 rounded-full font-medium tracking-wide border border-stone-700/50 shadow-soft pointer-events-none">
          {beforeLabel}
        </div>
      </div>

      {/* Center Divider Line & Handle */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white/90 shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none transition-transform"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Interactive Center Knob */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-pine-900 shadow-float flex items-center justify-center border-2 border-pine-700/20 group-hover:scale-110 transition-transform">
          <MoveHorizontal className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
