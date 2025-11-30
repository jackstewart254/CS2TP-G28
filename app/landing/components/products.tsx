import { useState } from "react";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "motion/react";
import { PricingBlock } from "@/components/pricing-card";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "job-market",
    title: "Job Market Data Packs",
    description: "Live insights into skills, roles, and market demand.",
    priceMonthly: 25,
    priceYearly: 250,
    rating: 4.8,
    products: [
      "Top Skills Report",
      "Industry Trends Pack",
      "Salary Insights Pack",
      "Role Demand Report",
      "Location Hotspots Pack",
    ],
  },
  {
    id: "university-performance",
    title: "University Performance Insights",
    description: "Data to help institutions improve employability outcomes.",
    priceMonthly: 25,
    priceYearly: 250,
    rating: 4.7,
    products: [
      "Employability Scorecard",
      "Skills Gap Summary",
      "Course Improvement Suggestions",
      "Graduate Outcomes Comparison",
      "Student Feedback Insights",
    ],
  },
  {
    id: "student-career",
    title: "Student Career Tools",
    description:
      "Tools that help students navigate the job market with clarity.",
    priceMonthly: 25,
    priceYearly: 250,
    rating: 4.9,
    products: [
      "Career Match Quiz",
      "Skill Gap Checker",
      "Keyword Optimiser",
      "Interview Prep Pack",
      "Learning Roadmap",
    ],
  },
  {
    id: "employer-recruitment",
    title: "Employer & Recruitment Tools",
    description: "Insight and intelligence for smarter hiring decisions.",
    priceMonthly: 25,
    priceYearly: 250,
    rating: 4.6,
    products: [
      "University Talent Finder",
      "Hiring Trends Dashboard",
      "Employer Brand Insights",
      "Campus Recruitment Planner",
      "Job Posting Keyword Tool",
    ],
  },
  {
    id: "education-skill",
    title: "Education & Skill Development",
    description: "Data-driven tools for shaping future-ready curriculums.",
    priceMonthly: 25,
    priceYearly: 250,
    rating: 4.95,
    products: [
      "Emerging Skills Pack",
      "Learning Resource Bundle",
      "Certification Value Guide",
      "Skill Development Tracker",
      "Workshop Ideas Pack",
    ],
  },
];

export function CardSpotlightCategories() {
  const featuredCategories = categories.slice(0, -1);
  const highlightCategory = categories[categories.length - 1];
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  const isMonthly = billingCycle === "monthly";

  return (
    <div className="flex flex-col gap-y-6 items-center px-10">
      <div className="flex flex-col pb-8 ">
        <motion.div className="relative mx-4  flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
          <LayoutTextFlip
            text="We transform"
            words={[
              "Products",
              "Insights",
              "Intelligence",
              "Engines",
              "Thinking",
            ]}
          />
        </motion.div>
        <p className="mt-4 text-center text-base text-neutral-600 dark:text-neutral-400">
          We bridge the space between raw ideas and concrete
          understanding—transforming curiosity into clarity, clarity into
          intelligence, and intelligence into products that move forward.
        </p>
      </div>

      <div className="w-full mb-20 space-y-12">
        <div className="flex w-full flex-col items-center justify-center gap-3">
          <p className="text-sm uppercase tracking-[0.35em] text-neutral-500 dark:text-white/50">
            Choose a billing cycle
          </p>
          <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white p-1 text-sm font-medium shadow-sm dark:border-white/10 dark:bg-neutral-900">
            <button
              type="button"
              className={cn(
                "rounded-full px-4 py-1.5 transition",
                isMonthly
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "text-neutral-500 dark:text-white/60",
              )}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              type="button"
              className={cn(
                "rounded-full px-4 py-1.5 transition",
                !isMonthly
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "text-neutral-500 dark:text-white/60",
              )}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 items-stretch justify-items-center">
          {featuredCategories.map((cat) => (
            <div key={cat.title} className="w-full h-full max-w-2xl">
              <PricingBlock
                title={cat.title}
                price={isMonthly ? cat.priceMonthly : cat.priceYearly}
                interval={isMonthly ? "/month" : "/year"}
                buttonLabel="Subscribe"
                href={`/payment?plan=${cat.id}`}
                features={[cat.description]}
                extras={cat.products.map((p) => p)}
                rating={cat.rating}
              />
            </div>
          ))}
        </div>

        {highlightCategory && (
          <div className="flex w-full justify-center">
            <div className="w-full h-full max-w-2xl">
              <PricingBlock
                title={highlightCategory.title}
                price={
                  isMonthly
                    ? highlightCategory.priceMonthly
                    : highlightCategory.priceYearly
                }
                interval={isMonthly ? "/month" : "/year"}
                buttonLabel="Subscribe"
                href={`/payment?plan=${highlightCategory.id}`}
                features={[highlightCategory.description]}
                extras={highlightCategory.products.map((p) => p)}
                rating={highlightCategory.rating}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
