import { ReactNode } from "react";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm font-semibold text-neutral-700 dark:text-white/80">
      {label}
      <div className="mt-2">{children}</div>
    </label>
  );
}

export { Field };
