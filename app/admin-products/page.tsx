"use client";
import { Footer } from "@/components/footer";
import { NavigationBar } from "@/components/admin-navigation";
import AdminProducts from "./content";

const Home = () => {
  return (
    <div>
      <NavigationBar />
      <AdminProducts />;
      <Footer />
    </div>
  );
};

export default Home;
