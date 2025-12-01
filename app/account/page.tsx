"use client";
import { Footer } from "@/components/footer";
import { NavigationBar } from "@/components/navigation";
import Account from "./content";

const AccountPage = () => {
  return (
    <div>
      <NavigationBar />
      <Account />
      <Footer />
    </div>
  );
};

export default AccountPage;
