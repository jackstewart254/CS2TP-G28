"use client";
import { Footer } from "@/components/footer";
import { NavigationBar } from "@/components/navigation";
import Payment from "./content";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-white">
      <NavigationBar />
      <Payment />
      <Footer />
    </div>
  );
};

export default Home;
