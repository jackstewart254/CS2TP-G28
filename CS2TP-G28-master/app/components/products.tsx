import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "motion/react";
import { PricingBlock } from "@/components/pricing-card";
import { CustomPricingNote } from "@/components/custom-pricing-note";

const categories = [
  {
    title: "Job Market Data Packs",
    description: "Live insights into skills, roles, and market demand.",
    products: [
      "Top Skills Report",
      "Industry Trends Pack",
      "Salary Insights Pack",
      "Role Demand Report",
      "Location Hotspots Pack",
    ],
  },
  {
    title: "University Performance Insights",
    description: "Data to help institutions improve employability outcomes.",
    products: [
      "Employability Scorecard",
      "Skills Gap Summary",
      "Course Improvement Suggestions",
      "Graduate Outcomes Comparison",
      "Student Feedback Insights",
    ],
  },
  {
    title: "Student Career Tools",
    description:
      "Tools that help students navigate the job market with clarity.",
    products: [
      "Career Match Quiz",
      "Skill Gap Checker",
      "Keyword Optimiser",
      "Interview Prep Pack",
      "Learning Roadmap",
    ],
  },
  {
    title: "Employer & Recruitment Tools",
    description: "Insight and intelligence for smarter hiring decisions.",
    products: [
      "University Talent Finder",
      "Hiring Trends Dashboard",
      "Employer Brand Insights",
      "Campus Recruitment Planner",
      "Job Posting Keyword Tool",
    ],
  },
  {
    title: "Education & Skill Development",
    description: "Data-driven tools for shaping future-ready curriculums.",
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

      <div className="lg:flex flex-col gap-6 mb-20">
        {/* Top row (3 cards) */}
        <div className="grid-cols-1 lg:flex flex-row gap-6 items-center justify-center">
          {categories.map((cat, index) => {
            const center = (categories.length - 1) / 2;
            const distance = Math.abs(index - center);
            const marginTop = distance * 20; // podium effect

            return (
              <div
                key={cat.title}
                className={`
          w-full
          lg:mt-[${marginTop}px]
                  mt-4
        `}
              >
                <PricingBlock
                  title={cat.title}
                  price={25}
                  interval="/month"
                  buttonLabel="Subscribe"
                  features={[cat.description]}
                  extras={cat.products.map((p) => `${p}`)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
