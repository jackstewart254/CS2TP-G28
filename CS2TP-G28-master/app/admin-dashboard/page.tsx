"use client";
import { Footer } from "@/components/footer";
import { NavigationBar } from "@/components/navigation";
import AdminDashboard from "./content";

const Home = () => {
  return (
    <div>
      <NavigationBar />
      <AdminDashboard />;
      <Footer />
    </div>
  );
};

export default Home;
