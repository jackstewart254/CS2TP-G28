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

export { StarRating };
