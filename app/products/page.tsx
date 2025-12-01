// "use client";
// import { Footer } from "@/components/footer";
// import { NavigationBar } from "@/components/navigation";
// import Products from "./content";

// const Home = () => {
//   return (
//     <div>
//       <NavigationBar />

//       <Products />;
//       <Footer />
//     </div>
//   );
// };

// export default Home;
"use client";

import { Footer } from "@/components/footer";
import { NavigationBar } from "@/components/navigation";
import ProductsContent from "./content"; // renamed import

export default function ProductsPage() {
  return (
    <div>
      <NavigationBar />
      <ProductsContent />
      <Footer />
    </div>
  );
}
