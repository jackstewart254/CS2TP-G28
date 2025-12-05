"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  UserCog,
  Settings,
  LogOut,
  User,
  UserRoundPlus,
  UserRound,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useFetchProducts } from "@/lib/hooks/useFetchProducts";
import { PageLoader } from "@/components/page-loader";
import { useFetchCategories } from "@/lib/hooks/useFetchCategories";
import { usePathname } from "next/navigation";
import Account from "@/app/account/content";
import { Content } from "../components/dashboard";
import MyProducts from "@/app/my-products/content";

const DashboardSidebar = () => {
  const path = usePathname().split("/")[3];
  const user = usePathname().split("/")[1];

  const links = [
    {
      label: "My products",
      href: `/${user}/dashboard/products`,
      icon: (
        <Package className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Account",
      href: `/${user}/dashboard/account`,
      icon: (
        <UserRound className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row  w-full flex-1   overflow-hidden",
        "h-[calc(100vh-53px)]"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 border-r">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      {path === "products" ? <MyProducts /> : <Account />}
    </div>
  );
};

export default DashboardSidebar;
