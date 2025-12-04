import { NavigationBar } from "@/components/navigation";
import About from "./content";
import { Footer } from "@/components/footer";

export default function AboutPage() {
  return (
    <div>
      <NavigationBar />
      <About />;
      <Footer />
    </div>
  );
}
