import { cn } from "@/lib/utils";
import { ReactNode } from "react";

function Badge({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border border-neutral-200 px-3 py-1 text-xs font-semibold text-neutral-700 transition  focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 dark:border-white/10 dark:text-white/80",
        onClick && "cursor-pointer"
      )}
    >
      {children}
    </button>
  );
}

export { Badge };
