"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden antialiased border  dark:border-white/10 dark:bg-black dark:bg-grid-white/[0.05] py-4",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 bg-transparent",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
          className
        )}
      >
        {[...items, ...items].map((item, idx) => (
          <li
            key={`${item.name}-${idx}`}
            className="relative w-[320px] max-w-full shrink-0 rounded-3xl border border-neutral-200 bg-white/95 px-6 py-6 shadow-[0_15px_50px_rgba(15,23,42,0.12)] transition hover:-translate-y-1 md:w-[420px] dark:border-white/10 dark:bg-neutral-900/90 snap-start"
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
