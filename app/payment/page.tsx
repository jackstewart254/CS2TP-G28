"use client";
import { Footer } from "@/components/footer";
import { NavigationBar } from "@/components/navigation";
import Payment from "./content";

const Home = () => {
  return (
    <div>
      <NavigationBar />
      <Payment />;
      <Footer />
    </div>
  );
};

export default Home;
