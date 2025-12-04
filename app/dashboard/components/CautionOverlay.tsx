const CautionOverlay = () => (
  <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
    {/* Blur background */}
    <div className="absolute inset-0 backdrop-blur-lg" />

    {/* Two horizontal strips */}

    {/* Strip 1 */}
    <div
      className="
        absolute top-1/3 left-0
        w-full 
        h-16
        bg-[repeating-linear-gradient(90deg,#facc15_0,#facc15_12px,#000_12px,#000_24px)]
        opacity-80
        mix-blend-multiply
      "
    />

    {/* Strip 2 */}
    <div
      className="
        absolute top-1/2 left-0
        w-full 
        h-16
        bg-[repeating-linear-gradient(90deg,#facc15_0,#facc15_12px,#000_12px,#000_24px)]
        opacity-80
        mix-blend-multiply
      "
    />
  </div>
);

export { CautionOverlay };
