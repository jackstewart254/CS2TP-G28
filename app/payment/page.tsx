import { Suspense } from "react";
import { Footer } from "@/components/footer";
import { NavigationBar } from "@/components/navigation";
import Payment from "./content";

export default function Home() {
  return (
    <div className="h-[100vh-52px] ">
      <NavigationBar />

      <Suspense fallback={<div className="p-10 text-center">Loading…</div>}>
        <Payment />
      </Suspense>
    </div>
  );
}
