"use client";

import { useRef } from "react";
import { WavyBackground } from "@/components/ui/wavy-background";
import { NavigationBar } from "@/components/navigation";
import { CardSpotlightCategories } from "./components/products";
import { TestimonialsRail } from "./components/testimonials";
import { Footer } from "@/components/footer";

export default function Landing() {
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const handleAdvisorClick = () => {
    testimonialsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="min-h-screen flex flex-col items-center ">
      <div className="flex-1 w-full flex flex-col items-center justify-center relative ">
        <NavigationBar />
        <div className="w-full items-center justify-center flex flex-col gap-16 no-scrollbar">
          <div className="relative w-full h-[calc(100vh*0.8)] flex items-center justify-center overflow-clip">
            <WavyBackground>
              <p className="text-2xl md:text-4xl lg:text-7xl font-bold inter-var text-center mx-4 lg:mx-0">
                The Foundation of Workforce Intelligence
              </p>
              <p className="text-base md:text-lg mt-4 font-normal inter-var text-center mx-4 lg:mx-0">
                Foundation Data transforms live job-market information into
                structured, accessible insights on skills, roles, and
                demand—giving students, educators, and innovators the data they
                need to build the future.
              </p>
            </WavyBackground>
          </div>

          <CardSpotlightCategories />
          <div className="flex w-full items-center mb-16">
            <TestimonialsRail ref={testimonialsRef} />
          </div>
        </div>
        <Footer />
      </div>

      <button
        type="button"
        onClick={handleAdvisorClick}
        className="group fixed bottom-6 right-6 z-50 overflow-hidden rounded-full border border-white/20 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-[0_25px_80px_rgba(59,130,246,0.45)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_35px_100px_rgba(59,130,246,0.55)]"
      >
        <span className="absolute inset-0 animate-[pulse_2.4s_infinite] bg-[radial-gradient(circle,_rgba(59,130,246,0.5),_rgba(129,140,248,0.35),_rgba(16,185,129,0.2))] opacity-60 blur-xl" />
        <span className="relative flex items-center gap-2">
          <span className="relative inline-flex h-2 w-2 animate-[ping_1.4s_infinite] rounded-full bg-white/80" />
          <span className="relative">Find my pack</span>
        </span>
      </button>
    </main>
  );
}
