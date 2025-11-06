"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { WavyBackground } from "@/components/ui/wavy-background";
import { NavigationBar } from "@/components/navigation";

export default function Landing() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center relative ">
        <NavigationBar />

        <div className="relative w-full flex items-center justify-center dark:text-white text-black overflow-clip">
          <WavyBackground>
            <p className="text-2xl md:text-4xl lg:text-7xl font-bold inter-var text-center">
              The Data Layer for the Workforce Economy
            </p>
            <p className="text-base md:text-lg mt-4 font-normal inter-var text-center">
              We provide live, structured intelligence on skills, roles, and
              market demand—an API-ready foundation for anyone building the
              future of education, hiring, or career innovation.
            </p>
          </WavyBackground>
        </div>
        <div className="h-96"></div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>Powered by CS2TP-G28</p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
