"use client";
import { Footer } from "@/components/footer";
import { NavigationBar } from "@/components/navigation";
import Products from "./content";

const Home = () => {
  return (
    <div>
      <NavigationBar />
      <Products />;
      <Footer />
    </div>
  );
};

export default Home;
