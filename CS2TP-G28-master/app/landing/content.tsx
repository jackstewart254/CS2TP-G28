"use client";

import { WavyBackground } from "@/components/ui/wavy-background";
import { NavigationBar } from "@/components/navigation";
import { CardSpotlightCategories } from "./components/products";
import { Footer } from "@/components/footer";

export default function Landing() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center justify-center relative ">
        <NavigationBar />
        <div className="w-full items-center justify-center flex flex-col">
          <div className="relative w-full h-[calc(100vh*0.8)] flex items-center justify-center overflow-clip">
            <WavyBackground>
              <p className="text-2xl md:text-4xl lg:text-7xl font-bold inter-var text-center mx-4 lg:mx-0">
                The Foundation of Workforce Intelligence
              </p>
              <p className="text-base md:text-lg mt-4 font-normal inter-var text-center mx-4 lg:mx-0">
                Foundation Data transforms live job-market information into
                structured, accessible insights on skills, roles, and demand —
                giving students, educators, and innovators the data they need to
                build the future.
              </p>
            </WavyBackground>
          </div>

          <CardSpotlightCategories />
        </div>
        <Footer />
      </div>
    </main>
  );
}
