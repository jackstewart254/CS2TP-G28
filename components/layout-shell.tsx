"use client"

import { NavigationBar } from "@/components/navigation"
import { ThemeSwitcher } from "@/components/theme-switcher"

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center justify-center relative">
        {/* Top navbar */}
        <NavigationBar />

        {/* Page-specific content */}
        <div className="w-full items-center justify-center flex flex-col">
          {children}
        </div>

        {/* Footer with theme switcher */}
        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>Powered by CS2TP-G28</p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  )
}
