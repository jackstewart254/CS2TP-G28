import { ReactNode } from "react";

const SectionCard = ({
  title,
  description,
  children,
  action,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  action?: React.ReactNode;
}) => {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white/90 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur dark:border-white/10 dark:bg-neutral-900/70 h-min w-full">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 dark:text-white/50">
            {title}
          </p>
          {description && (
            <p className="text-sm text-neutral-600 dark:text-white/65">
              {description}
            </p>
          )}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
};

export { SectionCard };
