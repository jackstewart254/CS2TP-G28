"use client";

import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React, { MouseEvent as ReactMouseEvent, useState } from "react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { cn } from "@/lib/utils";

export const CardSpotlight = ({
  children,
  radius = 200,

  // ✅ NEW — theme-aware colors
  colorLight = "rgba(147, 197, 253, 0.18)", // sky-300 @ 18%
  colorDark = "rgba(255,255,255,0.15)", // soft white halo on dark mode

  className,
  ...props
}: {
  radius?: number;

  /** Color of spotlight in LIGHT mode */
  colorLight?: string;

  /** Color of spotlight in DARK mode */
  colorDark?: string;

  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={cn(
        "group/spotlight relative rounded-2xl p-10 border transition-colors flex items-center justify-center ",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      {/* ✅ LIGHT MODE SPOTLIGHT */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover/spotlight:opacity-50 dark:hidden"
        style={{
          backgroundColor: colorLight,
          maskImage: useMotionTemplate`
            radial-gradient(  
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white ,
              transparent 80%
            )
          `,
        }}
      >
        {isHovering && (
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-transparent absolute inset-0 pointer-events-none"
            colors={[
              [59, 130, 246], // blue
              [139, 92, 246], // purple
            ]}
            dotSize={3}
          />
        )}
      </motion.div>

      {/* ✅ DARK MODE SPOTLIGHT */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100 hidden dark:block"
        style={{
          backgroundColor: colorDark,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
        }}
      >
        {isHovering && (
          <CanvasRevealEffect
            animationSpeed={5}
            containerClassName="bg-transparent absolute inset-0 pointer-events-none"
            colors={[
              [59, 130, 246],
              [139, 92, 246],
            ]}
            dotSize={3}
          />
        )}
      </motion.div>

      {/* ✅ CONTENT */}
      <div className="relative z-[5]">{children}</div>
    </div>
  );
};
