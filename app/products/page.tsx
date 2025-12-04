"use client";

import { Footer } from "@/components/footer";
import { NavigationBar } from "@/components/navigation";
import Products from "./content";

export default function ProductsPage() {
  return (
    <div className="no-scrollbar">
      <NavigationBar />
      <Products />
      <Footer />
    </div>
  );
}
