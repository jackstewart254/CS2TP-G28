"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CustomPricingNote } from "./custom-pricing-note";

interface PricingBlockProps {
  title: string;
  price: string | number;
  interval?: string;
  features: string[];
  extras?: string[];
  buttonLabel?: string;
  rating?: number;
  href?: string;
}

export function PricingBlock({
  title,
  price,
  interval = "/month",
  features,
  extras = [],
  buttonLabel = "Get Started",
  rating = 4.8,
  href = "/payment",
}: PricingBlockProps) {
  const [hovered, setHovered] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasExtras = extras.length > 0;

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const scheduleHover = (state: boolean, delay = 80) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      if (!hasExtras) {
        setHovered(false);
        return;
      }
      if (state) {
        setHovered(Boolean(cardRef.current?.matches(":hover")));
      } else {
        setHovered(false);
      }
    }, delay);
  };

  const handleCardEnter = () => scheduleHover(true);
  const handleCardLeave = () => scheduleHover(false, 50);
  const handleOverlayEnter = () => scheduleHover(true, 0);
  const handleOverlayLeave = () => scheduleHover(false, 100);

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleCardEnter}
      onMouseLeave={handleCardLeave}
      className={cn(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-[28px] border p-1 transition-transform duration-300",
        hovered
          ? "scale-[1.03] shadow-[0_35px_120px_rgba(0,0,0,0.25)]"
          : "scale-100 shadow-[0_20px_60px_rgba(0,0,0,0.12)]",
        "border-neutral-300 bg-white text-neutral-900 dark:border-white/15 dark:bg-neutral-950/90 dark:text-white"
      )}
    >
      <div className="flex flex-1 flex-col rounded-[24px] bg-gradient-to-b from-neutral-50 to-neutral-100 p-6 dark:from-neutral-900 dark:to-neutral-950">
        <HoverImageContainer hovered={hovered}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/25 via-purple-400/25 to-emerald-400/25 blur-3xl dark:from-blue-600/35 dark:via-purple-500/30 dark:to-emerald-500/35" />
          <div className="absolute inset-x-6 bottom-6 space-y-3">
            <p className="text-xl font-semibold">{title}</p>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-semibold text-neutral-500 dark:text-white/70">
                £
              </span>
              <span className="text-6xl font-bold">{price}</span>
              <span className="pb-1 text-sm text-neutral-500 dark:text-white/70">
                {interval}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-white/70">
              <RatingStars value={rating} />
              <span>{rating.toFixed(1)}/5</span>
            </div>
            <Link
              href={href}
              className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(59,130,246,0.35)] transition-transform duration-300 group-hover:scale-[1.02]"
            >
              {buttonLabel}
            </Link>
          </div>
        </HoverImageContainer>

        <div className="mt-6 flex flex-1 flex-col space-y-4">
          {features.map((feature, idx) => (
            <PricingItem
              key={idx}
              text={feature}
              color="bg-gradient-to-r from-blue-500 to-indigo-500"
              textClassName="text-sm text-neutral-700 dark:text-white/80"
            />
          ))}
          <CustomPricingNote />

          {hasExtras && (
            <div className="mt-auto flex items-center justify-between text-xs text-neutral-500 dark:text-white/60">
              <span>Hover to view what's included</span>
              <span className="tracking-[0.35em] text-neutral-400 dark:text-white/35">
                PREVIEW
              </span>
            </div>
          )}
        </div>
      </div>

      {hasExtras && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-40 hidden h-full w-full rounded-[28px] lg:flex transition-opacity duration-300",
            hovered ? "opacity-100" : "opacity-0"
          )}
          onMouseEnter={handleOverlayEnter}
          onMouseLeave={handleOverlayLeave}
        >
          <div className="pointer-events-auto h-full w-full rounded-[24px] border border-neutral-300 bg-white p-6 text-neutral-900 shadow-[0_25px_60px_rgba(0,0,0,0.18)] dark:border-white/15 dark:bg-neutral-950/95 dark:text-white">
            <div className="grid h-full gap-6 lg:grid-cols-[1.05fr,1.05fr]">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 dark:text-white/50">
                  Plan overview
                </p>
                <h3 className="text-3xl font-semibold">{title}</h3>
                <div className="flex items-end gap-1">
                  <span className="text-base font-semibold text-neutral-500 dark:text-white/70">
                    £
                  </span>
                  <span className="text-5xl font-extrabold">{price}</span>
                  <span className="pb-2 text-sm text-neutral-500 dark:text-white/60">
                    {interval}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-white/70">
                  <RatingStars value={rating} />
                  <span>{rating.toFixed(1)}/5</span>
                </div>
                {features.slice(0, 2).map((feature, idx) => (
                  <p key={idx} className="text-sm text-neutral-600 dark:text-white/70">
                    {feature}
                  </p>
                ))}
                <CustomPricingNote variant="overlay" />
              </div>

              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 dark:text-white/50">
                  Included in this pack
                </p>
                <div className="grid gap-3 lg:grid-cols-2">
                  {extras.map((extra, idx) => (
                    <PricingItem
                      key={idx}
                      text={extra}
                      color="bg-gradient-to-r from-blue-500 to-indigo-500"
                      textClassName="text-sm font-medium text-neutral-700 leading-relaxed dark:text-white"
                    />
                  ))}
                </div>
                <Link
                  href={href}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 py-3 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(59,130,246,0.35)] transition hover:scale-[1.01]"
                >
                  {buttonLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface HoverImageContainerProps {
  hovered: boolean;
  children: ReactNode;
}

function HoverImageContainer({ hovered, children }: HoverImageContainerProps) {
  return (
    <div className="relative mb-4 h-52 overflow-hidden rounded-2xl bg-neutral-200 dark:bg-neutral-800">
      <div
        className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.4),_transparent_60%)] transition-transform duration-500",
          hovered ? "scale-105" : "scale-100"
        )}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

function PricingItem({
  text,
  color,
  textClassName = "text-sm text-neutral-700 dark:text-white/80",
}: {
  text: string;
  color: string;
  textClassName?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={cn(
          "mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-white shadow-lg",
          color
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M5 12l4 4L19 7"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className={textClassName}>{text}</span>
    </div>
  );
}

function RatingStars({ value }: { value: number }) {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, idx) => {
        const fill = value - idx;
        return (
          <svg
            key={idx}
            className="h-4 w-4 text-blue-500"
            viewBox="0 0 24 24"
            fill={fill >= 1 ? "currentColor" : fill > 0 ? "url(#grad)" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <defs>
              <linearGradient id="grad" x1="0%" x2="100%">
                <stop offset={`${Math.max(Math.min(fill, 1), 0) * 100}%`} stopColor="#3b82f6" />
                <stop offset={`${Math.max(Math.min(fill, 1), 0) * 100}%`} stopColor="transparent" />
              </linearGradient>
            </defs>
            <path d="M12 3.5l2.6 5.27 5.8.85-4.2 4.09.99 5.79L12 16.77 6.81 19.5l.99-5.79-4.2-4.09 5.8-.85z" />
          </svg>
        );
      })}
    </div>
  );
}
