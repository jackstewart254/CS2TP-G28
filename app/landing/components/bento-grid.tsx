import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconChartBar,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { motion } from "motion/react";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";

export function BentoGridDemo() {
  return (
    <div className="flex flex-col pb-20 lg:mx-0 mx-6">
      {/* <div className="pb-10">
        <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
          <LayoutTextFlip
            text="We're giving entrepreneurs the power to "
            words={[
              "See Real Market Demand Instantly.",
              "Validate Ideas with Real-World Data.",
              "Discover Hidden Opportunities Early.",
              "Build Products Grounded in Truth.",
              "Move From Guesswork to Clarity.",
            ]}
          />
        </motion.div>

        <p className="mt-4 text-center text-base text-neutral-600 dark:text-neutral-400">
          Foundation Data turns the job market into clear, reliable
          intelligence—helping you understand demand, test ideas, and make
          confident decisions backed by real insight.
        </p>
      </div> */}
      <BentoGrid className="max-w-4xl mx-auto">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </div>
  );
}

const items = [
  {
    title: "Market Insight Foundations",
    description:
      "Understand the core signals driving today's job market, from skill demand to emerging roles.",

    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Intelligence Pipeline",
    description:
      "Explore how raw job data becomes clean, structured insight ready for analysis and innovation.",

    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Designing with Data",
    description:
      "See how real-time market insight can shape smarter products, better decisions, and clearer direction.",

    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Workforce Communication Signals",
    description:
      "Decode what employers are asking for and how industries communicate skill needs across the market.",

    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Future of Skill Knowledge",
    description:
      "Track rising skills, shifting roles, and the knowledge shaping tomorrow's opportunities.",

    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Product Lead, Atlas Labs",
    description:
      "We shipped faster because we finally knew which roles to prioritize and what skills customers actually value.",

    icon: <IconChartBar className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Founder, Northwind",
    description:
      "Foundation Data let us validate our next market in days instead of months, with evidence the whole team trusts.",

    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Ops Director, Meridian",
    description:
      "Clear hiring signals helped us reduce time-to-fill and align stakeholders on the roles that actually drive impact.",

    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
];
