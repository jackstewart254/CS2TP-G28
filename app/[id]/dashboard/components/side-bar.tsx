"use client";
import { PageLoader } from "@/components/page-loader";
import { Content } from "./dashboard";
import { SidebarBody, SidebarLink, SidebarProvider } from "@/components/ui/sidebar";
import { useFetchCategories } from "@/lib/hooks/useFetchCategories";
import { useFetchProducts } from "@/lib/hooks/useFetchProducts";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  LogOut,
  Settings,
  Sidebar,
  UserCog,
} from "lucide-react";
import { useState } from "react";

export function SidebarBase() {
  const { products, loading, error } = useFetchProducts();
  const {
    categories,
    loading: categoryLoading,
    error: categoryError,
  } = useFetchCategories();

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <UserCog className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  if (loading || categoryLoading) {
    return <PageLoader text="Loading your Dashboard..." />;
  }
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row  w-full flex-1   overflow-hidden",
        "h-[calc(100vh-53px)]"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <Content />
    </div>
  );
}
