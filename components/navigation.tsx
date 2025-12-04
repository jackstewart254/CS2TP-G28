"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ThemeSwitcher } from "./theme-switcher";
import { useCheckUser } from "@/lib/hooks/useCheckUser";
import { LogoutButton } from "./logout-button";

export function NavigationBar() {
  const {
    user: { name, valid, admin },
    loading,
    error,
  } = useCheckUser();

  console.log("valid", valid);

  console.log("admin", admin);
  const path = usePathname();
  const showStyle =
    path === "/dashboard" || path === "/admin-dashboard" || path === "/account";

  const router = useRouter();

  const guestNavItems = [
    {
      name: "Products",
      link: "/products",
    },
  ];

  const navItems = [
    {
      name: "Products",
      link: "/products",
    },
    {
      name: "Dashboard",
      link: "/dashboard",
    },

    {
      name: "Account",
      link: "/account",
    },
  ];

  const adminNavItems = [
    {
      name: "Products",
      link: "/products",
    },

    {
      name: "dashboard",
      link: "/admin-dashboard",
    },
    {
      name: "Account",
      link: "/account",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar className={showStyle ? "border-b backdrop-blur-md" : ""}>
      <NavBody className="backdrop-blur-md">
        <NavbarLogo />
        <NavItems
          items={
            valid ? (admin === true ? adminNavItems : navItems) : guestNavItems
          }
        />
        <div className="flex items-center gap-4">
          <ThemeSwitcher />

          {valid ? (
            <LogoutButton />
          ) : (
            <NavbarButton
              as="button"
              variant="primary"
              onClick={() => router.push("/auth/sign-up")}
            >
              Signup
            </NavbarButton>
          )}
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, index) => (
            <a
              key={`mobile-link-${index}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}
          <div className="flex w-full flex-col gap-4">
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full"
            >
              Login
            </NavbarButton>
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full"
            >
              Signup
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
