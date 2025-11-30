"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  allowManualScroll = false,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    product?: string;
    rating?: number;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  allowManualScroll?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const speedPxPerMs =
    speed === "slow" ? 0.03 : speed === "normal" ? 0.06 : 0.1;
  const rafRef = useRef<number>();
  const pauseRef = useRef(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const directionRef = useRef(direction);
  const speedRef = useRef(speedPxPerMs);
  const renderedItems = [...items, ...items];

  // Keep refs in sync without changing the animation effect signature.
  useEffect(() => {
    directionRef.current = direction;
    speedRef.current =
      speed === "slow" ? 0.03 : speed === "normal" ? 0.06 : 0.1;
  }, [direction, speed]);

  // Respect user reduced-motion preference: stop autoplay and allow manual scroll.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const shouldReduce = mediaQuery.matches;
      setPrefersReducedMotion(shouldReduce);
      pauseRef.current = shouldReduce;
    };
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (prefersReducedMotion) {
      // Let users scroll manually when reduced motion is requested.
      container.scrollLeft = 0;
      return;
    }

    let rafId: number | undefined;

    const tick = (now: number, last: number) => {
      const delta = now - last;
      const contentWidth = container.scrollWidth / 2 || 1;
      const distance = speedRef.current * delta;

      if (!pauseRef.current) {
        if (directionRef.current === "left") {
          container.scrollLeft += distance;
          if (container.scrollLeft >= contentWidth * 2) {
            container.scrollLeft -= contentWidth;
          }
        } else {
          container.scrollLeft -= distance;
          if (container.scrollLeft <= 0) {
            container.scrollLeft += contentWidth;
          }
        }
      }
      rafId = requestAnimationFrame((nextNow) => tick(nextNow, now));
    };

    // Kick off loop after layout is available.
    const start = () => {
      const half = container.scrollWidth / 2;
      if (directionRef.current === "right") {
        container.scrollLeft = half;
      }
      const initial = performance.now();
      rafId = requestAnimationFrame((now) => tick(now, initial));
    };

    start();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]); // do not change dependency length; refs handle dynamic values

  // Reset starting position when item count changes.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const half = container.scrollWidth / 2;
    if (directionRef.current === "right") {
      container.scrollLeft = half;
    }
  }, [items.length]);

  const handleMouseEnter = () => {
    if (pauseOnHover) pauseRef.current = true;
  };
  const handleMouseLeave = () => {
    if (pauseOnHover) pauseRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20",
        prefersReducedMotion || allowManualScroll
          ? "overflow-x-auto no-scrollbar"
          : "overflow-hidden",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ul className="flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4">
        {renderedItems.map((item, idx) => (
          <li
            className="relative w-[320px] max-w-full shrink-0 rounded-3xl border border-neutral-200 bg-white/95 px-6 py-6 shadow-[0_15px_50px_rgba(15,23,42,0.12)] transition hover:-translate-y-1 md:w-[420px] dark:border-white/10 dark:bg-neutral-900/90 snap-start"
            key={`${item.name}-${idx}`}
          >
            <blockquote className="relative z-20">
              {(item.product || typeof item.rating === "number") && (
                <div className="mb-3 flex items-center justify-between text-xs text-neutral-500 dark:text-gray-400">
                  <span className="font-semibold text-neutral-800 dark:text-gray-200">
                    {item.product}
                  </span>
                  <StarRating value={item.rating} />
                </div>
              )}
              <div
                aria-hidden="true"
                className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span className="relative z-20 text-base leading-relaxed font-normal text-neutral-800 dark:text-gray-100">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] font-semibold text-neutral-900 dark:text-gray-100">
                    {item.name}
                  </span>
                  <span className="text-sm leading-[1.6] font-normal text-neutral-500 dark:text-gray-400">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};

function StarRating({ value }: { value?: number }) {
  if (typeof value !== "number") return null;
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, idx) => (
          <svg
            key={idx}
            className="h-3.5 w-3.5 text-blue-500"
            viewBox="0 0 24 24"
            fill={value > idx ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={value > idx ? 0 : 1.5}
          >
            <path d="M12 3.5l2.6 5.27 5.8.85-4.2 4.09.99 5.79L12 16.77 6.81 19.5l.99-5.79-4.2-4.09 5.8-.85z" />
          </svg>
        ))}
      </div>
      <span className="text-[11px] font-semibold text-neutral-600 dark:text-gray-300">
        {value.toFixed(1)}
      </span>
    </div>
  );
}
