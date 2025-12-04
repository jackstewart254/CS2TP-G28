const PageLoader = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-53px)] w-full">
      <div className="relative flex flex-col items-center gap-4">
        <div
          className="
          h-16 w-16 rounded-full 
          animate-spin 
          bg-gradient-to-r 
          from-[#38bdf8] via-[#818cf8] to-[#22d3ee]
          p-[3px]
        "
        >
          <div className="h-full w-full rounded-full bg-background"></div>
        </div>

        <p className="text-neutral-600 dark:text-neutral-400 text-sm animate-pulse">
          {text}
        </p>
      </div>
    </div>
  );
};

export { PageLoader };
