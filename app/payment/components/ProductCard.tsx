import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export function ProductCard({
  index,
  name,
  price,
  description,
}: {
  index: number;
  name: string;
  price: number;
  description: string;
}) {
  const [selected, setSelected] = useState(false);

  return (
    <div
      className="
        group relative flex flex-col gap-2 
        rounded-xl border border-neutral-200 dark:border-neutral-800 
        bg-white dark:bg-neutral-900 
        p-6 shadow-sm transition-all 
        hover:shadow-[0_8px_22px_rgba(0,0,0,0.06)]
        dark:hover:shadow-[0_8px_22px_rgba(255,255,255,0.05)]
      "
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-neutral-400 dark:text-neutral-500 font-medium">
            {index + 1}.
          </span>

          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            {name}
          </h3>
        </div>

        <span
          className="
            text-sm px-3 py-1 rounded-full 
            bg-blue-50 text-blue-700 
            dark:bg-blue-900/30 dark:text-blue-300
            font-medium
          "
        >
          £{price}
        </span>
      </div>
      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
