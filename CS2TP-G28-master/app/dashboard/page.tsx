"use client";
import Dashboard from "./content";
import { Footer } from "@/components/footer";
import { NavigationBar } from "@/components/navigation";

const Home = () => {
  return (
    <div>
      <NavigationBar />
      <Dashboard />;
      <Footer />
    </div>
  );
};

export default Home;
