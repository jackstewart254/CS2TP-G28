"use client";
import { SidebarDemo } from "./content";
import { NavigationBar } from "@/components/navigation";

const Home = () => {
  return (
    <div>
      <NavigationBar />
      <SidebarDemo />
    </div>
  );
};

export default Home;
