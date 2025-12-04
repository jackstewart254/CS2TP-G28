"use client";

import { toast } from "sonner";
import { LoaderCircle } from "./loader-circle";

export function EventLoader(message: string) {
  return toast(
    <div className="flex items-center gap-3">
      <LoaderCircle />
      <span className="text-sm text-foreground">{message}</span>
    </div>,
    {
      duration: Infinity,
      closeButton: false,
      important: true,
    }
  );
}
