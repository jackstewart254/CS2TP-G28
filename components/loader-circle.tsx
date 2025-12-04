"use client";

import { motion } from "framer-motion";

export function LoaderCircle() {
  return (
    <motion.div
      className="
        h-4 w-4 
        rounded-full 
        border-2 
        border-foreground/30 
        border-t-foreground
      "
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
    />
  );
}
