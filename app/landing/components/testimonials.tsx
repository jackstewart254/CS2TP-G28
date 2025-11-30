"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const testimonials = [
  {
    name: "Emma Hughes",
    product: "Education & Skill Development",
    title: "Head of Careers, Northshore University",
    rating: 5,
    quote:
      "We mapped our entire curriculum to emerging skills in two weeks. Students now see a clear line between classes and roles.",
  },
  {
    name: "Liam Carter",
    product: "Employer & Recruitment Tools",
    title: "Talent Lead, Horizon Robotics",
    rating: 4.7,
    quote:
      "The pack showed us which campuses were already teaching the tools we needed. Sourcing graduates is now a science.",
  },
  {
    name: "Sophia Turner",
    product: "Student Career Tools",
    title: "Program Director, FutureWorks Bootcamp",
    rating: 4.8,
    quote:
      "Learners get realistic demand signals and instantly see which skills raise their salary ceiling. Engagement is up 63%.",
  },
  {
    name: "James Ellis",
    product: "Job Market Data Packs",
    title: "Product Lead, Vision Labs",
    rating: 4.9,
    quote:
      "We prototyped three new data products from the pack in a quarter. The tiles of skill demand inspired our roadmap.",
  },
  {
    name: "Maya Chen",
    product: "Market Intelligence",
    title: "Product Lead, Atlas Labs",
    rating: 4.9,
    quote:
      "We shipped faster because we finally knew which roles to prioritize and what skills customers actually value.",
  },
  {
    name: "Arjun Patel",
    product: "Go-To-Market",
    title: "Founder, Northwind",
    rating: 4.8,
    quote:
      "Foundation Data let us validate our next market in days instead of months, with evidence the whole team trusts.",
  },
  {
    name: "Grace Kim",
    product: "Talent Strategy",
    title: "Ops Director, Meridian",
    rating: 4.8,
    quote:
      "Clear hiring signals helped us reduce time-to-fill and align stakeholders on the roles that actually drive impact.",
  },
];

export const TestimonialsRail = forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("w-full max-w-6xl space-y-6 px-4 md:px-0", className)}
      >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-white/50">
                  Why buyers choose us
                </p>
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
              Real teams unlocking products
            </h2>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl antialiased border border-neutral-200 bg-white/95 shadow-[0_15px_50px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-black dark:bg-grid-white/[0.05] py-10">
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed="slow"
              pauseOnHover
              allowManualScroll={false}
              className="px-4"
            />
          </div>
        </div>
      </section>
    );
  }
);
TestimonialsRail.displayName = "TestimonialsRail";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden py-8">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
        pauseOnHover
        allowManualScroll={false}
      />
    </div>
  );
}
